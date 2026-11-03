class Person {
    constructor(lastName, firstName, age) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
    }

    getFullName() {
        return this.lastName + " " + this.firstName;
    }
}

class User extends Person {
    constructor(lastName, firstName, age, education, purpose, requestDate, requestTime) {
        super(lastName, firstName, age);
        this.education = education;
        this.purpose = purpose;
        this.requestDate = requestDate;
        this.requestTime = requestTime;
    }

    getInfo() {
        return this.getFullName() + ", вік: " + this.age + ", освіта: " + this.education + ", мета: " + this.purpose + ", дата: " + this.requestDate + ", час: " + this.requestTime;
    }
}

class UserRegistry {
    constructor(users) {
        this.users = users;
    }

    getUsersByMonthAndTime(targetMonth, targetTime) {
        return this.users.filter(function(user) {
            let parts = user.requestDate.split("-");
            let userMonth = Number(parts[1]);
            return userMonth === targetMonth && user.requestTime === targetTime;
        });
    }

    getMinAgeUser() {
        if (this.users.length === 0) {
            return null;
        }
        let minUser = this.users[0];
        for (let i = 1; i < this.users.length; i++) {
            if (this.users[i].age < minUser.age) {
                minUser = this.users[i];
            }
        }
        return minUser;
    }

    classifyUsers() {
        let higherInWorkHours = [];
        let noEduOutsideWorkHours = [];
        let others = [];

        for (let i = 0; i < this.users.length; i++) {
            let u = this.users[i];
            let isWorkHours = u.requestTime >= "09:00" && u.requestTime <= "17:00";

            if (u.education === "Вища" && isWorkHours) {
                higherInWorkHours.push(u);
            } else if (u.education === "Без освіти" && !isWorkHours) {
                noEduOutsideWorkHours.push(u);
            } else {
                others.push(u);
            }
        }

        return {
            higherInWorkHours: higherInWorkHours,
            noEduOutsideWorkHours: noEduOutsideWorkHours,
            others: others
        };
    }

    sortAlphabetically() {
        let sortedList = this.users.concat();
        sortedList.sort(function(a, b) {
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
        });
        return sortedList;
    }
}

let initialUsers = [
    new User("Шевченко", "Ярослав", 25, "Без освіти", "Консультація щодо ЦНАП", "2026-04-05", "12:00"),
    new User("Бондаренко", "Олександр", 34, "Вища", "Пропозиція щодо ремонту дороги", "2026-04-12", "10:30"),
    new User("Василенко", "Олена", 19, "Без освіти", "Запит на отримання довідки", "2026-04-12", "10:30"),
    new User("Гриценко", "Михайло", 18, "Без освіти", "Звернення щодо волонтерства", "2026-05-02", "19:15"),
    new User("Дмитренко", "Надія", 45, "Вища", "Скарга на порушення благоустрою", "2026-03-20", "14:00"),
    new User("Ковальчук", "Ігор", 52, "Середня спеціальна", "Пропозиція щодо освітлення вулиці", "2026-04-25", "08:30"),
    new User("Мельник", "Тетяна", 29, "Вища", "Оформлення допомоги для ВПО", "2026-02-14", "11:45"),
    new User("Петренко", "Сергій", 61, "Без освіти", "Запит на соціальне обслуговування", "2026-06-10", "20:00"),
    new User("Сидоренко", "Марина", 38, "Середня спеціальна", "Скарга на роботу транспорту", "2026-04-18", "16:20"),
    new User("Ткаченко", "Дмитро", 42, "Вища", "Питання щодо містобудівних умов", "2026-01-19", "18:30")
];

let registry = new UserRegistry(initialUsers);

console.log("=== Завдання 2.1: Користувачі за квітень (місяць 4) о 10:30 ===");
let matchedUsers = registry.getUsersByMonthAndTime(4, "10:30");
for (let i = 0; i < matchedUsers.length; i++) {
    console.log(matchedUsers[i].getInfo());
}

console.log("\n=== Завдання 2.2: Мінімальний вік та освіта ===");
let youngestUser = registry.getMinAgeUser();
if (youngestUser) {
    console.log("Користувач: " + youngestUser.getFullName());
    console.log("Мінімальний вік: " + youngestUser.age);
    console.log("Освіта: " + youngestUser.education);
}

console.log("\n=== Завдання 2.3: Поділ користувачів на 3 класи ===");
let classes = registry.classifyUsers();

console.log("1. З вищою освітою у робочий час (09:00 - 17:00): " + classes.higherInWorkHours.length + " осіб");
for (let i = 0; i < classes.higherInWorkHours.length; i++) {
    console.log("   - " + classes.higherInWorkHours[i].getFullName() + " (" + classes.higherInWorkHours[i].education + ", " + classes.higherInWorkHours[i].requestTime + ")");
}

console.log("2. Без освіти у неробочий час: " + classes.noEduOutsideWorkHours.length + " осіб");
for (let i = 0; i < classes.noEduOutsideWorkHours.length; i++) {
    console.log("   - " + classes.noEduOutsideWorkHours[i].getFullName() + " (" + classes.noEduOutsideWorkHours[i].education + ", " + classes.noEduOutsideWorkHours[i].requestTime + ")");
}

console.log("3. Інші: " + classes.others.length + " осіб");
for (let i = 0; i < classes.others.length; i++) {
    console.log("   - " + classes.others[i].getFullName() + " (" + classes.others[i].education + ", " + classes.others[i].requestTime + ")");
}

console.log("\n=== Завдання 2.4: Сортування в алфавітному порядку із виведенням мети ===");
let sortedUsers = registry.sortAlphabetically();
for (let i = 0; i < sortedUsers.length; i++) {
    console.log((i + 1) + ". " + sortedUsers[i].getFullName() + " — Мета звернення: " + sortedUsers[i].purpose);
}

console.log("\n================ ДЕМОНСТРАЦІЯ ТЕХНІЧНИХ ВИМОГ ================");

console.log("\n--- 1. Оператор switch ---");
let demoEducation = initialUsers[0].education;
switch (demoEducation) {
    case "Вища":
        console.log("Категорія: Фахівець з вищою освітою");
        break;
    case "Без освіти":
        console.log("Категорія: Заявник без вищої освіти");
        break;
    default:
        console.log("Категорія: Інший рівень освіти");
}

console.log("\n--- 2. Способи оголошення функцій ---");
function greetDeclaration(name) {
    return "Привіт від Declaration, " + name;
}
let greetExpression = function(name) {
    return "Привіт від Expression, " + name;
};
let greetArrow = (name) => "Привіт від Arrow, " + name;

console.log(greetDeclaration("Ірпінь"));
console.log(greetExpression("Ірпінь"));
console.log(greetArrow("Ірпінь"));

console.log("\n--- 3. Методи об'єкта Date ---");
let currentDateObj = new Date("2026-04-12T10:30:00");
console.log("getFullYear():", currentDateObj.getFullYear());
console.log("getMonth():", currentDateObj.getMonth() + 1);
console.log("getDate():", currentDateObj.getDate());

console.log("\n--- 4. Методи об'єкта String ---");
let demoString = "Ірпінська міська рада";
console.log("split(' '):", demoString.split(" "));
console.log("toUpperCase():", demoString.toUpperCase());
console.log("indexOf('міська'):", demoString.indexOf("міська"));
