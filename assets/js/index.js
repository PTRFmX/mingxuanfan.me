const data = {
    "info": "Welcome to my website! This is Mingxuan Fan, I'm a 3-rd year college student at the University of California, San Diego and my major is Math - Computer Science. You can know more about me by exploring this site, have fun!",
    "edu": [
        {
            "school": "Chengdu Foreign Language School",
            "diploma": "High school diploma",
            "major": "N/A",
            "time": "2015-2018"
        },
        {
            "school": "University of California, San Diego",
            "diploma": "Bachelor",
            "major": "Math - Computer Science",
            "time": "2018-2022"
        }
    ],
    "experience": [
        {
            "company": "MSRA (Microsoft Research Asia)",
            "title": "Research Intern",
            "time": "2020.6 - 2020.12"
        },
        {
            "company": "Qualcomm Institute UCSD",
            "title": "Web Development Intern",
            "time": "2020.2 - 2020.6"
        }
    ],
    "projects": [
        {
            "name": "UnSea",
            "title": "Technical Lead",
            "description": "An anonymous social platform",
            "time": "2020.1 - 2021.2"
        },
        {
            "name": "UCSD Triple C Official Website",
            "title": "Developer",
            "description": "The official website for UCSD Chinese Computer Comumunity (Triple C)",
            "time": "2019.12 - 2020.2"
        },
        {
            "name": "FlyerFighter",
            "title": "Developer",
            "description": "A platform for clubs at UCSD to publish events and news",
            "time": "2019.2 - 2019.6"
        }
    ]
}

let input = $('.input')
let main = $('#main')

$(document).ready(function() {
    input.focus();
    // write content
    const displayText = "Connecting...<br>Connection Established.<br>Copyright (c) 2021 ptrfmx.me All Rights Reserved.<br> Root Access Granted<br><br>Type 'help' to see available commands, have fun!<br><br>";
    $('#dummy').html(displayText);
})

$(document).on('keypress', function(event)  {
    if (event.which == 13) {
        let val = input.val()
        if (val === '') {
            console.log("empty input")
            main.append('[<span class="usr">root</span>@<span class="host">ptrfmx.me ~</span>]%<br>');
        }
        else {
            let newHtml = '';
            const { info, edu, experience, projects }  = data;
            switch (val) {
                case 'help': {
                    newHtml = printHelp();
                    break;
                }
                case 'clear': {
                    main.html('');
                    break;
                }
                case 'exit': {
                    window.location.href = "main.html";
                    break;
                }
                case 'info': {
                    newHtml = printInfo(info);
                    break;
                }
                case 'education': {
                    newHtml = '<br>Education History:<br>'
                    edu.forEach(d => {
                        newHtml += printData(d);
                    })
                    break;
                }
                case 'experience': {
                    newHtml = '<br>Work Experience:<br>'
                    experience.forEach(d => {
                        newHtml += printData(d);
                    })
                    break;
                }
                case 'projects': {
                    newHtml = '<br>Projects:<br>'
                    projects.forEach(d => {
                        newHtml += printData(d);
                    })
                    break;
                }
                default: {
                    newHtml = `bash: command not found: ${val}<br>`
                    break;
                }
            }
            if (val !== 'clear') main.append(`[<span class="usr">root</span>@<span class="host">ptrfmx.me ~</span>]% ${val}<br>` + newHtml);
        }
        $('body,html').animate({ scrollTop: $(document).height() }, 0);
        input.val('');
        input.focus();
    }
    
})

window.onresize = function () {
    input.width($(document).width() - $('.prefix').width() - 160)
};

/**
 * @param {*} data 
 * @returns {*} HTML String
 */
function printData(d) {
    let str = '';
    const keys = Object.keys(d);
    console.log(d, keys)
    keys.forEach(key => {
        str += `<span>${key.charAt(0).toUpperCase() + key.slice(1)}: ${d[key]}</span><br/>`;
    })
    return str + '<br>';
}

/**
 * @returns {*} HTML String
 */
function printHelp() {
    let str = '';
    str += 'Available commands: <br>';
    str += '- info <br>';
    str += '- experience <br>';
    str += '- education <br>';
    str += '- projects <br>';
    str += '- clear <br>';
    str += '- exit <br>';
    return str;
}

/**
 * @param {*} info 
 * @returns {*} HTML String
 */
function printInfo(info) {
    return "<br>" + info + "<br><br>"
}