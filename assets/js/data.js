let achievments = [
  {
    id:8,
    img: "../assets/achievements/19.webp",
    heading:'2019 SAE International',
    description:[
      'Phoenix was ranked 7th globally in SAE International',
      "The team also bagged the 1st place in Design Report "
    ]
  },
  {
    id: 1,
    img:  "../assets/achievements/18.webp",
    heading: "2018 SAE International",
    description: [
      "Ranked 9th in SAE International",
      "The team secured the 1st position in design report",
    ],
  },
  {
    id: 2,
    img:  "../assets/achievements/17.webp",
    heading: "2017 SAE International",
    description: [
      "The team was placed at the 15th position globally",
      "The team bagged the 3rd place in the Asia-Pacific region",
    ],
  },
  {
    id: 3,
    img:  "../assets/achievements/16.webp",
    heading: "2016 SAE International",
    description: ["The team secured the 13th position globally in micro class"],
  },
  {
    id: 4,
    img: "../assets/achievements/15.webp",
    heading: "2015 SAE",
    description: [
      "The team got the 11th position globally",
      "Our team secured the 1st position among all the Indian teams",
    ],
  },
  {
    id: 5,
    img: "../assets/achievements/14.webp",
    heading: "2014 SAE",
    description: [
      "The team got the 11th position globally",
      "Our team secured the 1st position among all the Indian teams",
    ],
  },
  {
    id: 6,
    img: "../assets/achievements/13.webp",
    heading: "2013 SAE",
    description: [
      "Phoenix was the only Indian team to qualify for the finals of AIAA",
    ],
  },
  {
    id: 7,
    img: "../assets/achievements/12.webp",
    heading: "2012 SAE",
    description: [
      "The team was ranked 18th globally",
      "We also secured the 2nd position amongst all the Indian teams",
    ],
  },
];

const row = document.querySelector("#outer-row");
achievments = achievments.reverse();

achievments.forEach((achievment) => {
  const newRow = row.cloneNode(true);
  const image = newRow.querySelector(".image-side");
  const text = newRow.querySelector(".row");
  const list = document.createElement("ul");
  achievment.description.forEach((desc) => {
    const listItem = document.createElement("li");
    listItem.textContent = desc;
    list.append(listItem);
  });
  image.querySelector("img")["src"] = achievment.img;
  text.querySelector("h3").textContent = achievment.heading;
  text.querySelector("p").textContent = '';
  text.querySelector("p").append(list);
  row.after(newRow);
});
