import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import url from 'url';

const getFileName = (link) => {
  const { host, path } = url.parse(link);
  const name = `${host}${path}`.replace(/[\.\/]/g, '-');
  return `${name}.html`;
}

export default (link, dirpath) => {
  const filePath = path.join(dirpath, getFileName(link));

  return axios
    .get(link)
    .then((response) => {
      fs.writeFile(filePath, response.data);
    })
    .catch((err) => {
      throw err;
    });
}
