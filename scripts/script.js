// Wanted to utilize a fun keyboarding effect I read up on! From this website: https://css-tricks.com/snippets/css/typewriter-effect/



// Every element in the node list is going to get 
// We are targetting all the elements we want impacted by the type writer effect 

// Define function
let TxtType = function(el, toRotate, period) {
    // What the phrase is: 
    this.toRotate = toRotate;
    // Which is element its targetting:
    this.el = el;
    this.loopNum = 0;
    // The speed at which this run (parseInt is a function to Javascript) - essentially setting the duration (10 is the default - the increments we count in) || is the operator -- if the period is not provided, we default to 2000 milliseconds
    // period = how long the phrase stays on the screen before deletion
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    // This is the function that was created to actually animate:
    this.tick();
    this.isDeleting = false;
};



// The animation function for our phrase:

TxtType.prototype.tick = function() {

    // let i = this.loopNum % this.toRotate.length;

    // Essentially we are changing the array we have used in our HTML into a string, so that we can use the substring method specific to strings. Keeping the full word so we can reference back to it.
    // declaring full text as the phrase we can use as a reference. We have to use the substring method, which is why we use [0]
    let fullTxt = this.toRotate[0];
    // First condition (deleting is false):
    // .substring method extracts a part of a string (first number is the starting index, the second is the up to but not including it)
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // originally starts as empty (we set this in the function above). And now we're setting it to the substring of 0 to 1 (starts at the first character and ends at first character)

        // replacing current this.txt with this new this.txt by using substring method on our original full.txt string 
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // targeting the elements inner html and putting it inside the span with the first character we have grabbed
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    // creating a new variable that has all the properties of this (giving it the properties of everything we have above)
    let that = this;

    // the letters that populate a slightly less that 200 speed, before running the tick function --> for aesthetics
    let delta = 200 - Math.random() * 100;

    // if it's deleting, the frequency of the letter disappearing is twice as fast --> for aesthetics
    if (this.isDeleting) { delta /= 2; }

    // Is deleting false and this txt equal full text (it doesn't because it is one character), skips this condition
    // When we reach the end of the phrase, this logic says we are now going backwards 
    if (!this.isDeleting && this.txt === fullTxt) {
    // how long we want the function to run again (have it there before we start deleting)
    delta = this.period;
    this.isDeleting = true;
    // If this is deleting (it's not because it's false right now and this.txt is not an empty string), we skip
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // still not 100% sure what this is exactly referencing 
    this.loopNum++;
    // wait half a second before it starts the type writing effect again
    delta = 500;
    }

    // Gonna rerun this function again but with the updated list 
    setTimeout(function() {
    that.tick();
    }, delta);
};

// On page load we will run this function: We would typically type this out first to see what we will need to access 

window.onload = function() {
    // Looking for all elements with the class "typewrite", it will return a node list of all the elements with this class, loop through each one of them and then apply the function textype to it, where it will take in Node index, the phrase, and the duration
    let elements = document.getElementsByClassName('typewrite');
    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        // if it has a toRotate we are going to run a new TxtType
        if (toRotate) {
            // feeding three arguments (element, the phrase, and period)
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};