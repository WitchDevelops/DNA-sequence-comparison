// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  // factory function to generate specimen and dna
  function pAequorFactory(specimenNum, dna) {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate() {
        // Select a random base index to mutate
        const randomBaseIndex = Math.floor(Math.random() * this.dna.length);
        // Get the current base at the selected index
        const currentBase = this.dna[randomBaseIndex];
        // Generate a new random base that is different from the current base
        let newBase = returnRandBase();
        while (newBase === currentBase) {
          newBase = returnRandBase();
        }
        // Update the DNA strand with the new mutated base
        this.dna[randomBaseIndex] = newBase;
        // Return the mutated DNA
        return this.dna;
      },
      compareDNA(otherOrganism) {
        //check how many bases are the same %
        let identicalBases = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherOrganism.dna[i]) {
            identicalBases++;
          }
        }
        const percentageIdentical = ((identicalBases / this.dna.length) * 100).toFixed(2);
        console.log(
          `Specimen ${this.specimenNum} and Specimen ${otherOrganism.specimenNum} have ${percentageIdentical}% DNA in common.`
        );
      },
      willLikelySurvive() {
        let contentCG = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === "C" || this.dna[i] === "G") {
            contentCG++;
          }
        }
        let percentCG = ((contentCG / this.dna.length) * 100).toFixed(2);
            //console.log(`${percentCG}% CG`);
        if (percentCG >= 60) {
          //console.log("I will survive!");
          return true;
        } else {
          //console.log("I will die");
          return false;
        }
      },
      complementStrand() {
        const complementMap = {
          A: 'T',
          T: 'A',
          C: 'G',
          G: 'C'
        };
  
        const complementDNA = this.dna.map(base => complementMap[base]);
  
        return complementDNA;
      }
    };
  }
  
  

  function generateSurvivablePAequorInstances(numInstances) {
    const pAequorInstances = [];
  
    while (pAequorInstances.length < numInstances) {
      const org = pAequorFactory(pAequorInstances.length + 1, mockUpStrand());
      if (org.willLikelySurvive()) {
        pAequorInstances.push(org);
      }
    }
  
    return pAequorInstances.map(instance => instance.dna.join(""));
  }
  
  //const numInstances = 30;
  //const survivableInstances = generateSurvivablePAequorInstances(1);
  
  //console.log(survivableInstances);

  let org = pAequorFactory(1, mockUpStrand());
  console.log("Original DNA:", org.dna);
  console.log("Complementary DNA:", org.complementStrand());
