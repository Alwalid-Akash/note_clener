const mongoose = require("mongoose")

const userSchemac = new mongoosw.schema({

  name: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, // never returned by default
  role: { type: String, enum: ["user", "admin"], default: "user" },
},
  { timestamps: true }
);

export default mongoose.model("User", userSchema);