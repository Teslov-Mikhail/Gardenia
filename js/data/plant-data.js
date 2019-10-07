let plantData = {
  greenweed: {
    name: "Greenweed",
    sprite: "plants/greenweed.png",
    moisture: 1,
    rootSize: 0.8,
    edibleness: 0,
    spreading: 0.4,
    size: 0.4
  },
  drygrass: {
    name: "Drygrass",
    sprite: "plants/drygrass.png",
    moisture: 0.1,
    rootSize: 0.1,
    edibleness: 0.2,
    spreading: 0.1,
    size: 0.6
  },
  seedgrass: {
    name: "Seedgrass",
    sprite: "plants/seedgrass.png",
    moisture: 0.5,
    rootSize: 0.4,
    edibleness: 0.3,
    spreading: 0.2,
    size: 0.5
  },
  bulbroot: {
    name: "Bulbroot",
    sprite: "plants/bulbroot.png",
    moisture: 0.4,
    rootSize: 0.8,
    edibleness: 0.6,
    spreading: 0.3,
    size: 0.4
  },
  seedcob: {
    name: "Seedcob",
    sprite: "plants/seedcob.png",
    moisture: 0.5,
    rootSize: 0.2,
    edibleness: 0.6,
    spreading: 0.4,
    size: 1.2
  },
  fluidfruit: {
    name: "Fluidfruit",
    sprite: "plants/fluidfruit.png",
    moisture: 1.5,
    rootSize: 0.3,
    edibleness: 1,
    spreading: 0.4,
    size: 0.8
  },
  fatroot: {
    name: "Fatroot",
    sprite: "plants/fatroot.png",
    moisture: 0.6,
    rootSize: 0.6,
    edibleness: 0.6,
    spreading: 0.6,
    size: 0.4
  },
  juiceberry: {
    name: "Juiceberry",
    sprite: "plants/juiceberry.png",
    moisture: 1.2,
    rootSize: 0.2,
    edibleness: 0.8,
    spreading: 0.6,
    size: 1
  }
};

class PlantData {
  static getPlantData(name) {
    return plantData[name];
  }

  static getClosest(data) {
    let closest = {};

    for (var plant in plantData) {
      if (plantData.hasOwnProperty(plant)) {
        let differences = [
          +Math.abs(plantData[plant].moisture - data.moisture).toFixed(2),
          +Math.abs(plantData[plant].rootSize - data.rootSize).toFixed(2),
          +Math.abs(plantData[plant].edibleness - data.edibleness).toFixed(2),
          +Math.abs(plantData[plant].spreading - data.spreading).toFixed(2),
          +Math.abs(plantData[plant].size - data.size).toFixed(2)
        ];

        let ratio = 0;

        for (let difference of differences) {
          ratio += difference;
        }

        ratio /= differences.length;

        console.log(differences);
        console.log("Difference value: ", ratio);

        if (!closest.ratio || closest.ratio > ratio) {
          closest.reference = data;
          closest.reference.name = plantData[plant].name;
          closest.reference.sprite = plantData[plant].sprite;
          closest.ratio = ratio;
        }
      }
    }

    return closest.reference;
  }
}

export {PlantData};
