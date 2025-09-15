import fs from "fs/promises";

export class FileManager {
  async removeFiles(paths: string[]) {
    try {
      await Promise.all(paths.map(p => fs.unlink(p)));
    } catch (err) {
      console.warn("Failed to remove files", err);
    }
  }
}
