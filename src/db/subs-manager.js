import SubsModel from "../models/SubsModel.js";

export default class SubsManager {
  async createSubList() {
    try {
      const response = await SubsModel.create({ subs: [] });
      if (!response) {
        throw new Error("Error creating sub");
      }
      return {
        message: "Sub created successfully",
        payload: response,
      };
    } catch (error) {
      throw error;
    }
  }

  async getSubList(id) {
    try {
      const response = await SubsModel.findById(id).lean();
      if (!response) {
        throw new Error("Sub not found");
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addSub(id, sub) {
    try {
      const { title, expiresOn, price, company } = sub;
      if (!title || !expiresOn || !price || !company) {
        throw new Error("Missing fields");
      }
      const response = await SubsModel.findByIdAndUpdate(id, {
        $push: { subs: sub },
      });
      if (!response) {
        throw new Error("Error adding sub");
      }
      return {
        message: "Sub added successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async updateSub(id, idSub, newData) {
    try {
      const list = await SubsModel.findById(id).lean();

      if (!list) {
        throw new Error("SubList not found");
      }
      let sub = list.subs.find((sub) => sub._id == idSub);
      let subIndex = list.subs.findIndex((sub) => sub._id == idSub);
      if (!sub) {
        throw new Error("Sub not found");
      }
      sub = { ...sub, ...newData };
      list.subs[subIndex] = sub;
      await SubsModel.findByIdAndUpdate(id, list);

      return {
        message: "Sub updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteSub(id, idSub) {
    try {
      const list = await SubsModel.findById(id).lean();
      if (!list) {
        throw new Error("SubList not found");
      }
      const response = await SubsModel.findByIdAndUpdate(id, {
        $pull: { subs: { _id: idSub } },
      });
      if (!response) {
        throw new Error("Error deleting sub");
      }
      return {
        message: "Sub deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async updateSubListIsPaid(id) {
    try {
      const list = await SubsModel.findById(id).lean();
      if (!list) {
        throw new Error("SubList not found");
      }
      list.subs.forEach((sub) => (sub.isPaid = false));
      await SubsModel.findByIdAndUpdate(id, list);
      return {
        message: "SubList updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
