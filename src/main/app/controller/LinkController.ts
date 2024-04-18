import type { IpcMainInvokeEvent as InvokeEvent } from "electron";
import { Link } from "../db";

async function getAllLinks(_event: InvokeEvent) {
  const links = await Link.findAll();
  return links.map((link) => link.toJSON());
}

async function getLinkById(_event: InvokeEvent, id: number) {
  const link = await Link.findByPk(id);
  return link ? link.toJSON() : null;
}

async function getLinksByCategoryId(_event: InvokeEvent, categoryId: number) {
  const links = await Link.findAll({ where: { categoryId } });
  return links.map((link) => link.toJSON());
}

async function createLink(_event: InvokeEvent, newLinkData: any) {
  const link = await Link.create(newLinkData);
  return link.toJSON();
}

async function updateLink(_event: InvokeEvent, id: number, newData: any) {
  const link = await Link.findByPk(id);
  if (link) {
    await link.update(newData);
    return link.toJSON();
  }
  return null;
}

async function deleteLink(_event: InvokeEvent, id: number) {
  const deletedCount = await Link.destroy({ where: { id } });
  return deletedCount > 0;
}

export const linkController = {
  getAllLinks,
  getLinkById,
  getLinksByCategoryId,
  createLink,
  updateLink,
  deleteLink,
}