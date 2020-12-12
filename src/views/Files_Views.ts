import File from '../models/File';

export default {
  render(file: File) {
    return {
      id: file.id,
      url: `http://localhost:3333/uploads/${file.path}`,
    };
  },
}
