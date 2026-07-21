import { addressRepository } from "@/lib/repositories/address.repository";

class AddressService {
  async getByUser(userId: number) {
    return addressRepository.findByUser(userId);
  }

  async create(
    userId: number,
    data: {
      title: string;
      receiverName: string;
      receiverPhone: string;
      province: string;
      city: string;
      postalCode: string;
      addressLine: string;
      plaque?: string;
      unit?: string;
      isDefault?: boolean;
    },
  ) {
    this.validate(data);

    return addressRepository.create({
      userId,
      ...data,
    });
  }

  async update(
    id: number,
    userId: number,
    data: {
      title: string;
      receiverName: string;
      receiverPhone: string;
      province: string;
      city: string;
      postalCode: string;
      addressLine: string;
      plaque?: string;
      unit?: string;
      isDefault?: boolean;
    },
  ) {
    this.validate(data);

    const address = await addressRepository.findById(id, userId);

    if (!address) {
      throw new Error("آدرس پیدا نشد.");
    }

    return addressRepository.update(id, userId, data);
  }

  async delete(id: number, userId: number) {
    const address = await addressRepository.findById(id, userId);

    if (!address) {
      throw new Error("آدرس پیدا نشد.");
    }

    return addressRepository.delete(id, userId);
  }

  async setDefault(id: number, userId: number) {
    const address = await addressRepository.findById(id, userId);

    if (!address) {
      throw new Error("آدرس پیدا نشد.");
    }

    return addressRepository.setDefault(id, userId);
  }

  private validate(data: {
    receiverName: string;
    receiverPhone: string;
    addressLine: string;
  }) {
    if (!data.receiverName.trim()) {
      throw new Error("نام گیرنده الزامی است.");
    }

    if (!data.receiverPhone.trim()) {
      throw new Error("شماره گیرنده الزامی است.");
    }

    if (!data.addressLine.trim()) {
      throw new Error("آدرس الزامی است.");
    }
  }
}

export const addressService = new AddressService();