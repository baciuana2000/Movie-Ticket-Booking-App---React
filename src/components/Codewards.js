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

const filme = {
  comedie: [
    {actorname:"default actor name",description:"film de actioune"},
    {actorname:"default dsfss name",description:"film de actioune"},
    {actorname:"23423 actor name",description:"film de actioune"},
    {actorname:"default acfsfds2342tor name",description:"film de actioune"},
    {actorname:"default 2342 name",description:"film de actioune"},
    {actorname:"default actor name",description:"film de actioune"},
    {actorname:"default 23423 name",description:"film de actioune"},
  
  ],



  actiune: ["diaria vampirilor", "orginials"],
  dragoste: ["if i stay"]
}
console.log(
  Object.keys(filme).forEach((el, i)=>{
    console.log(el,i)
    
  })
  )



const keys = Object.keys(doc);
console.log("🚀 ~ keys", keys)

keys.forEach(el=>{
    console.log(doc.[el])
})