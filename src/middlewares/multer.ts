import multer from 'multer';
import Crypto from 'crypto';
import path from 'path';

export default multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'images'),
    filename(request, file, cb) {
      const hash = Crypto.randomBytes(12).toString('hex');
      const filename = `${hash}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
