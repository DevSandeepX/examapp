import course1 from "./course1.jpg"
import course2 from "./course2.jpg"
import course3 from "./course3.jpg"
import course4 from "./course4.jpg"


const assets = {
    course1, course2, course3, course4
}

export  const courseList = [
    {img_url:assets.course1, name:"It Tools and Network Basics",rating:"3.3",code:"m1-r5"},
    {img_url:assets.course2, name:"Web Designing & Publishing",rating:"1.9",code:"m2-r5"},
    {img_url:assets.course3, name:"Problam solving Python",rating:"1.7",code:"m3-r5"},
    {img_url:assets.course4, name:"Internate of Things",rating:"2.6",code:"m4-r5"}
]

export default assets