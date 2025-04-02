class GreeterElement extends HTMLElement {
    static observedAttributes = ["contents"];

    constructor() {
        super();

    }

    connectedCallback() {
        console.log("connected")
    }

    disconnectedCallback() {
        console.log("disconnected")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
        `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
    }
}

customElements.define("greeter-element", GreeterElement)

const greeterElement = document.createElement("greeter-element")

document.body.append(greeterElement)

setTimeout(function() {
    greeterElement.setAttribute("contents", "Emil")
}, 1000);

setTimeout(function() {
    greeterElement.remove()
}, 2000);







// class Teacher {
//     constructor(name, courses) {
//         this.name = name;
//         this.courses = courses;
//     }

//     greeting() {
//         console.log(`${this.name} teaches ${this.courseString}`)
//     }

//     get courseString() {
//         return this.courses.join(", ");
//     }
// }

// const betty = new Teacher("Betty", ["DV1609", "DV1705"])

// betty.greeting()

// console.log(betty.courseString)










// const teacherPrototype = {
//     greeting: function greeting() {
//         console.log(`${this.name} teaches ${this.courses.join(", ")}`)
//     }
// }

// function Teacher(name, courses) {
//     this.name = name;
//     this.courses = courses;
// }

// Object.assign(Teacher.prototype, teacherPrototype)


// Teacher.prototype.hellYeah = function() {
//     console.log("Hell Yeah!");
// }

// // Inget vi uppmanar att göra
// Array.prototype.hellYeah = function() {
//     console.log("Hell Yeah!");
// }


// const mattias = new Teacher("Mattias", ["DV1609", "DV1705"])
// const emil = new Teacher("Emil", ["DV1609", "DV1705", "PA1438"])

// console.log(mattias)
// // console.log(emil.courses)

// // emil.greeting()


