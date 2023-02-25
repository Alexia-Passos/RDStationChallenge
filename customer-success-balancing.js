/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  //separates valid css for operations
  let csMapped = [];

  customerSuccess.map((item) => {
    var findCsAway = customerSuccessAway.find((el) => el === item.id);
    if (!findCsAway) {
      csMapped.push(item);
    }
  });

  //find customers sucess higher and lower score
  let highScore = [];
  let lowScore = [];

  csMapped.map((i) => {
    if (i.score >= 60) {
      return highScore.push(i);
    } else if (i.score <= 59) {
      return lowScore.push(i);
    }
  });

  // find customers higher and lower score
  let highCustomerScore = [];
  let lowCustomerScore = [];

  customers.map((i) => {
    if (i.score >= 60) {
      return highCustomerScore.push(i);
    } else if (i.score <= 59) {
      return lowCustomerScore.push(i);
    }
  });

  // define amount of customer for each higher cs
  const highScoreOperation = () => {
    if (highScore.length % highCustomerScore.length === 0) {
      return highScore.length / highCustomerScore.length;
    } else if (highScore.length % highCustomerScore.length !== 0) {
      let higherScoreMapped = csMapped.reduce(function (prev, current) {
        return prev.score > current.score ? prev : current;
      });

      let customersReceived = Math.ceil(
        (highScore.length % highCustomerScore.length) +
          highScore.length / highCustomerScore.length
      );
      let higherScoreArray = [higherScoreMapped, customersReceived];
      return higherScoreArray;
    }
  };

  // define amount of customer for each lower cs
  const lowScoreOperation = () => {
    if (lowScore.length % lowCustomerScore.length === 0) {
      return lowScore.length / lowCustomerScore.length;
    } else if (lowScore.length % lowCustomerScore.length !== 0) {
      let lowerScoreMapped = csMapped.reduce(function (prev, current) {
        return prev.score > current.score ? prev : current;
      });

      let customersReceived = Math.ceil(
        (lowScore.length % lowCustomerScore.length) +
          lowScore.length / lowCustomerScore.length
      );
      let lowerScoreArray = [lowerScoreMapped, customersReceived];
      return lowerScoreArray;
    }
  };

  const higherCss = highScoreOperation();
  const lowerCss = lowScoreOperation();

  //establishes cases of comparison of results
  if (typeof higherCss === "number" && typeof lowerCss === "number") {
    return 0;
  } else if (typeof higherCss === "object" && typeof lowerCss === "object") {
    if (higherCss[0].score > lowerCss[0].score) {
      return higherCss[0].id;
    } else if (higherCss[0].score < lowerCss[0].score) {
      return lowerCss[0].id;
    } else {
      return 0;
    }
  } else if (typeof higherCss === "number" && typeof lowerCss === "object") {
    if (higherCss > lowerCss[0].score) {
      return higherCss;
    } else if (higherCss < lowerCss[0].score) {
      return lowerCss[0].id;
    } else {
      return 0;
    }
  } else if (typeof higherCss === "object" && typeof lowerCss === "number") {
    if (higherCss[0].score > lowerCss) {
      return higherCss[0].id;
    } else if (higherCss[0].score < lowerCss) {
      return lowerCss;
    } else {
      return 0;
    }
  }
}

// customerSuccessBalancing(css, customers, csAway);

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});
