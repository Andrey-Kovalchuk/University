let activities = [
    {
        id: 1,
        name: "Відбудова житлового фонду",
        department: "Управління інфраструктури",
        stateBodyConnection: "Міністерство розвитку громад, територій та інфраструктури України",
        viewsDay1: 420,
        viewsDay2: 380,
        duration: 24
    },
    {
        id: 2,
        name: "Соціальний захист ветеранів та ВПО",
        department: "Управління соціальної політики",
        stateBodyConnection: "Міністерство соціальної політики України",
        viewsDay1: 310,
        viewsDay2: 290,
        duration: 12
    },
    {
        id: 3,
        name: "Модернізація шкільних укриттів",
        department: "Управління освіти і науки",
        stateBodyConnection: "Міністерство освіти і науки України",
        viewsDay1: 540,
        viewsDay2: 490,
        duration: 12
    },
    {
        id: 4,
        name: "Капітальний ремонт дорожнього покриття",
        department: "Управління інфраструктури",
        stateBodyConnection: "Державне агентство відновлення та розвитку інфраструктури України",
        viewsDay1: 260,
        viewsDay2: 280,
        duration: 18
    },
    {
        id: 5,
        name: "Розвиток електронних послуг ЦНАП",
        department: "Відділ цифрової трансформації",
        stateBodyConnection: "Міністерство цифрової трансформації України",
        viewsDay1: 390,
        viewsDay2: 410,
        duration: 6
    },
    {
        id: 6,
        name: "Озеленення та благоустрій рекреаційних зон",
        department: "Управління інфраструктури",
        stateBodyConnection: "Міністерство захисту довкілля та природних ресурсів України",
        viewsDay1: 180,
        viewsDay2: 210,
        duration: 12
    },
    {
        id: 7,
        name: "Енергомодернізація лікарень та котелень",
        department: "Управління інфраструктури",
        stateBodyConnection: "Міністерство енергетики України",
        viewsDay1: 330,
        viewsDay2: 350,
        duration: 24
    },
    {
        id: 8,
        name: "Психологічна реабілітація постраждалих",
        department: "Управління соціальної політики",
        stateBodyConnection: "Міністерство охорони здоров'я України",
        viewsDay1: 220,
        viewsDay2: 250,
        duration: 6
    },
    {
        id: 9,
        name: "Підтримка малого та середнього бізнесу",
        department: "Відділ економіки та інвестицій",
        stateBodyConnection: "Міністерство економіки України",
        viewsDay1: 190,
        viewsDay2: 170,
        duration: 24
    },
    {
        id: 10,
        name: "Розвиток молодіжних просторів і спорту",
        department: "Управління освіти і науки",
        stateBodyConnection: "Міністерство молоді та спорту України",
        viewsDay1: 280,
        viewsDay2: 300,
        duration: 36
    }
];

function sortByDuration(list) {
    return list.sort(function(a, b) {
        return a.duration - b.duration;
    });
}

function findAverageViewsBySameDuration(list) {
    let durations = [];
    for (let i = 0; i < list.length; i++) {
        if (durations.indexOf(list[i].duration) === -1) {
            durations.push(list[i].duration);
        }
    }

    let results = [];
    for (let i = 0; i < durations.length; i++) {
        let currentDuration = durations[i];
        let filtered = list.filter(function(item) {
            return item.duration === currentDuration;
        });

        if (filtered.length > 1) {
            let totalViews = 0;
            for (let j = 0; j < filtered.length; j++) {
                totalViews += filtered[j].viewsDay1 + filtered[j].viewsDay2;
            }
            let average = totalViews / filtered.length;
            results.push({
                duration: currentDuration,
                count: filtered.length,
                averageViews: Math.round(average * 100) / 100
            });
        }
    }
    return results;
}

function findMaxViewsDay1(list) {
    if (list.length === 0) {
        return null;
    }
    let maxItem = list[0];
    for (let i = 1; i < list.length; i++) {
        if (list[i].viewsDay1 > maxItem.viewsDay1) {
            maxItem = list[i];
        }
    }
    return maxItem;
}

function addActivity(list, newItem) {
    let hasAllInfo = true;

    if (newItem.id === undefined || newItem.id === null || newItem.id === "") {
        hasAllInfo = false;
    } else if (newItem.name === undefined || newItem.name === null || newItem.name === "") {
        hasAllInfo = false;
    } else if (newItem.department === undefined || newItem.department === null || newItem.department === "") {
        hasAllInfo = false;
    } else if (newItem.stateBodyConnection === undefined || newItem.stateBodyConnection === null || newItem.stateBodyConnection === "") {
        hasAllInfo = false;
    } else if (newItem.viewsDay1 === undefined || newItem.viewsDay1 === null) {
        hasAllInfo = false;
    } else if (newItem.viewsDay2 === undefined || newItem.viewsDay2 === null) {
        hasAllInfo = false;
    } else if (newItem.duration === undefined || newItem.duration === null) {
        hasAllInfo = false;
    }

    if (hasAllInfo) {
        list.unshift(newItem);
    } else {
        list.push(newItem);
    }
}

function calculateDepartmentDuration(departmentName, list) {
    let deptActivities = list.filter(function(item) {
        return item.department === departmentName;
    });

    if (deptActivities.length === 0) {
        return 0;
    }

    let totalDuration = deptActivities[0].duration;
    for (let i = 1; i < deptActivities.length; i++) {
        totalDuration += deptActivities[i].duration * 1.1;
    }

    return Math.round(totalDuration * 100) / 100;
}

console.log("=== Завдання 1.1: Впорядкування за терміном реалізації ===");
sortByDuration(activities);
for (let i = 0; i < activities.length; i++) {
    console.log("ID: " + activities[i].id + ", Напрям: " + activities[i].name + ", Термін: " + activities[i].duration + " міс., Відділ: " + activities[i].department);
}

console.log("\n=== Завдання 1.1: Середня кількість читачів для однакових термінів ===");
let avgResults = findAverageViewsBySameDuration(activities);
for (let i = 0; i < avgResults.length; i++) {
    console.log("Термін: " + avgResults[i].duration + " міс. (напрямів: " + avgResults[i].count + ") — середня кількість читачів: " + avgResults[i].averageViews);
}

console.log("\n=== Завдання 1.2: Максимальна кількість читачів за добу 1 ===");
let maxActivity = findMaxViewsDay1(activities);
if (maxActivity) {
    console.log("Напрям: " + maxActivity.name);
    console.log("Кількість читачів за добу 1: " + maxActivity.viewsDay1);
    console.log("Відділ, що його реалізує: " + maxActivity.department);
}

console.log("\n=== Завдання 1.3: Додавання нових записів ===");
let completeItem = {
    id: 11,
    name: "Безпечне місто (система відеонагляду)",
    department: "Відділ цивільного захисту",
    stateBodyConnection: "Міністерство внутрішніх справ України",
    viewsDay1: 150,
    viewsDay2: 170,
    duration: 12
};

let incompleteItem = {
    id: 12,
    name: "Громадський бюджет громади",
    department: "Відділ економіки та інвестицій",
    stateBodyConnection: "",
    viewsDay1: 110,
    viewsDay2: null,
    duration: 6
};

addActivity(activities, completeItem);
console.log("Додано повний запис (на початок): ID " + activities[0].id + " - " + activities[0].name);

addActivity(activities, incompleteItem);
let lastIndex = activities.length - 1;
console.log("Додано неповний запис (у кінець): ID " + activities[lastIndex].id + " - " + activities[lastIndex].name);

console.log("\n=== Завдання 1.4: Розрахунок тривалості одночасної реалізації напрямів ===");
let testDepartment = "Управління інфраструктури";
let calculatedDuration = calculateDepartmentDuration(testDepartment, activities);
console.log("Відділ: " + testDepartment);
console.log("Загальна тривалість реалізації: " + calculatedDuration + " міс.");

console.log("\n================ ДЕМОНСТРАЦІЯ ТЕХНІЧНИХ ВИМОГ ================");

console.log("\n--- 1. Типи даних (typeof) ---");
console.log("typeof 24:", typeof 24);
console.log("typeof 'Ірпінь':", typeof "Ірпінь");
console.log("typeof true:", typeof true);
console.log("typeof {}:", typeof {});
console.log("typeof sortByDuration:", typeof sortByDuration);
console.log("Особливість typeof null:", typeof null);

console.log("\n--- 2. Явне перетворення типів ---");
console.log("Number('42'):", Number("42"), typeof Number("42"));
console.log("String(100):", String(100), typeof String(100));
console.log("Boolean(1):", Boolean(1), typeof Boolean(1));

console.log("\n--- 3. Оператори ---");
let calcA = 10 + 5;
let calcB = 20 - 4;
let calcC = 6 * 3;
console.log("Арифметичні (+, -, *):", calcA, calcB, calcC);
let valX = 50;
valX += 10;
valX -= 5;
console.log("Присвоєння (=, +=, -=):", valX);
console.log("Порівняння (===, !==, >):", (10 === 10), (10 !== 20), (15 > 8));

console.log("\n--- 4. Цикли (while, do-while) ---");
let counterWhile = 0;
while (counterWhile < 2) {
    counterWhile++;
}
console.log("Цикл while (з передумовою) завершено, counter:", counterWhile);

let counterDo = 0;
do {
    counterDo++;
} while (counterDo < 1);
console.log("Цикл do-while (з постумовою) виконавсь 1 раз, counter:", counterDo);

console.log("\n--- 5. 8 методів роботи з масивом ---");
let demoArr = [10, 20, 30];
demoArr.push(40);
demoArr.unshift(5);
let popped = demoArr.pop();
let shifted = demoArr.shift();
demoArr.sort((a, b) => a - b);
let filteredArr = demoArr.filter(x => x > 15);
let idx = demoArr.indexOf(20);
let joinedStr = demoArr.join(" - ");
console.log("Результат методів масиву:", demoArr, "Joined:", joinedStr, "Filter > 15:", filteredArr);

console.log("\n--- 6. 3 методи Math ---");
console.log("Math.max(10, 50, 30):", Math.max(10, 50, 30));
console.log("Math.min(10, 50, 30):", Math.min(10, 50, 30));
console.log("Math.round(84.6):", Math.round(84.6));
