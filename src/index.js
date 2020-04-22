class TownElement {
    constructor(name, yearOfBuilt) {
        this.name = name;
        this.yearOfBuilt = yearOfBuilt;
    }
}

class Street extends TownElement {
    constructor(name, yearOfBuilt, lengthKm, sizeCategory = 3) {
        super(name, yearOfBuilt);
        this.lengthKm = lengthKm;
        this.sizeCategory = sizeCategory;
    }

    classifyStreet() {
        const streetClasses = new Map();
        streetClasses.set(1, 'tiny');
        streetClasses.set(2, 'small');
        streetClasses.set(3, 'normal');
        streetClasses.set(4, 'big');
    
        console.log(`${this.name}, built in ${this.yearOfBuilt}, is a ${streetClasses.get(this.sizeCategory)} street.`);
    }
}

class Park extends TownElement {
    constructor(name, yearOfBuilt, sizeKm2, trees) {
        super(name, yearOfBuilt);
        this.sizeKm2 = sizeKm2;
        this.trees = trees;
    }

    getTreeDensity() {
        return (this.trees/this.sizeKm2).toFixed(0);
    }
}

function parksReport(parks) {
    let parksNum = 0;
    let parksAgeSum = 0;
    let parksAverageAge = 0;
    let bigParks = [];

    parks.forEach(park => {
        parksNum++;
        const parkAge = new Date().getFullYear() - park.yearOfBuilt;
        parksAgeSum = parksAgeSum + parkAge;
        
        if (park.trees > 1000) {
            bigParks.push(park.name);
        }
    });
    
    parksAverageAge = (parksAgeSum / parksNum).toFixed(1);

    console.log(`Our ${parksNum} parks have an average age of ${parksAverageAge} years. Parks wich have more than 1000 trees: ${bigParks.length > 1 ? bigParks.join(', ') : bigParks[0]}.\nOur parks:`);

    parks.forEach(park => {
        const {name, size, trees} = park;
        console.log(`${name} has a tree density of ${ park.getTreeDensity() } per square km.`);
    });
}

function streetsReport(streets) {
    const lengths = streets.map(street => street.lengthKm);
    const sumLength = lengths.reduce((previous, current, index) => previous + current, 0);
    const streetsAverageLength = ((sumLength / streets.length)).toFixed(1);

    console.log(`Our ${streets.length} streets have a total length of ${sumLength}km, with an average of ${streetsAverageLength}km.\nThe list of our streets:`);

    streets.forEach(street => street.classifyStreet());

}

function townReport(streets, parks){

    console.log('\n -------------PARK REPORTS:');
    parksReport(parks);

    console.log('\n------------STREET REPORTS:');
    streetsReport(streets)
}

// streets: name, yearOfBuilt, lengthKm, sizeCategory
let streets = [
    new Street('Willington road', 1985, 3),
    new Street('Hill street', 1980, 1.5, 2),
    new Street('Forest street', 1990, 2, 2),
    new Street('Main street', 1970, 5, 4)
];

// parks: name, yearOfBuilt, sizeKm2, trees
let parks = [
    new Park('National park', 1985, 1, 300),
    new Park('Forest park', 1980, 0.5, 1300),
    new Park('Old park', 1970, 3, 3300)
];

townReport(streets, parks);
