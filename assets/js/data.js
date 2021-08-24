let achievments = [
  {
    id: 8,
    img: "../assets/achievements/19.webp",
    heading: "2019 SAE International",
    descriptionIn: [
      "Phoenix was ranked 7th globally in SAE International",
      "The team also bagged the 1st place in Design Report ",
    ],
    descriptionN: [],
  },
  {
    id: 1,
    img: "../assets/achievements/18.webp",
    heading: "2018 SAE International",
    descriptionIn: [
      "Ranked 9th in SAE International",
      "The team secured the 1st position in design report",
    ],
    descriptionN: [
      "We also secured the 2nd position amongst all the Indian teams",
    ],
  },
  {
    id: 2,
    img: "../assets/achievements/17.webp",
    heading: "2017 SAE International",
    descriptionIn: [
      "The team was placed at the 15th position globally",
      "The team bagged the 3rd place in the Asia-Pacific region",
    ],
    descriptionN: [],
  },
  {
    id: 3,
    img: "../assets/achievements/16.webp",
    heading: "2016 SAE International",
    descriptionIn: [
      "The team secured the 13th position globally in micro class",
    ],
    descriptionN: [],
  },
  {
    id: 4,
    img: "../assets/achievements/15.webp",
    heading: "2015 SAE",
    descriptionIn: ["The team got the 11th position globally"],
    descriptionN: [
      "Our team secured the 1st position among all the Indian teams",
    ],
  },
  {
    id: 5,
    img: "../assets/achievements/14.webp",
    heading: "2014 SAE",
    descriptionIn: ["The team got the 11th position globally"],
    descriptionN: [
      "Our team secured the 1st position among all the Indian teams",
    ],
  },
  {
    id: 6,
    img: "../assets/achievements/13.webp",
    heading: "2013 SAE",
    descriptionIn: [
      "Phoenix was the only Indian team to qualify for the finals of AIAA",
    ],
    descriptionN: [],
  },
  {
    id: 7,
    img: "../assets/achievements/12.webp",
    heading: "2012 SAE",
    descriptionIn: ["The team was ranked 18th globally"],
    descriptionN: [
      "We also secured the 2nd position amongst all the Indian teams",
    ],
  },
];

setTimeout(() => {
  const row = document.querySelector("#outer-row");
  achievments = achievments.reverse();

  achievments.forEach((achievment) => {
    const newRow = row.cloneNode(true);
    const image = newRow.querySelector(".image-side");
    const text = newRow.querySelector(".row");
    const list = document.createElement("ul");
    achievment.descriptionIn.forEach((desc) => {
      const listItem = document.createElement("li");
      listItem.textContent = desc;
      list.append(listItem);
    });
    image.querySelector("img")["src"] = achievment.img;
    text.querySelector("h3").textContent = achievment.heading;
    const listsToRemove = text.querySelector("ul");
    const listNational = document.createElement("ul");
    if (achievment.descriptionN.length > 0) {
      achievment.descriptionN.forEach((desc) => {
        const listItem = document.createElement("li");
        listItem.textContent = desc;
        listNational.append(listItem);
      });
    }
    const listRemove = listsToRemove.querySelectorAll("li");
    listRemove.forEach((el) => {
      el.remove();
    });

    const divElement = document.createElement("div");
    divElement.setAttribute("id", "n");
    text.querySelector("#in").append(list);
    text.querySelector("#n").append(listNational);
    row.after(newRow);
    const nationalListRemove = text
      .querySelector("#n")
      .querySelector("ul")
      .querySelectorAll("li");

      console.log(nationalListRemove);

    nationalListRemove.forEach((el) => {
      if (el.textContent==="") {
        const parent = el.parentNode.parentNode;
        if (parent) {
          if (!parent.querySelector("li")) {
            console.log(parent.querySelector('li'));
            el.parentNode.parentNode.previousElementSibling.remove();
          }
        }
        el.parentNode.remove();
      }
    });
  });
}, 500);
