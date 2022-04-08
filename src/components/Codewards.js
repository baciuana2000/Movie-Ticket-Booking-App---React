const doc = {
  Comedie: [
    {
      a: "Name 2",
    },
  ],
  Action: [
    {
      a: "Default description",
    },
  ],
  Romance: [
    {
      b: "sdfasfas",
    },
  ],
};
const keys = Object.keys(doc);
console.log("🚀 ~ keys", keys)

keys.forEach(el=>{
    console.log(doc.[el])
})