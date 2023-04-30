import * as mongoose from 'mongoose';
const Schema = mongoose.Schema; //用到schema要获取mongoose的schema
const d = new Date(); //配置add_time为当前时间。所以要获取当前日 期

export const AdminSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  mobile: { type: String },
  email: { type: String },
  status: { type: Number, default: 1 },
  role_id: { type: Schema.Types.ObjectId },
  add_time: {
    type: Number,
    default: d.getTime(),
  },
  is_super: { type: Number },
});
