(this.webpackJsonpmd2practice=this.webpackJsonpmd2practice||[]).push([[0],{168:function(e,t,n){},788:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"getAssessmentInfos",(function(){return q})),n.d(r,"extractAssessmentInfos",(function(){return U}));var c,a,l=n(0),s=n.n(l),i=n(85),o=n.n(i),u=(n(168),n(13)),d=n(18),h=n(68),f=n(69);!function(e){e.IDLE="IDLE",e.CORRECT="CORRECT",e.WRONG="WRONG"}(c||(c={})),function(e){e[e.SINGLE=0]="SINGLE",e[e.MULTIPLE=1]="MULTIPLE"}(a||(a={}));var m,b,j,g,x,p,v,O,y,w,E,C,k,N,I,L,R=function(){function e(t,n,r,c,l){Object(h.a)(this,e),this.challengeType=void 0,this.index=void 0,this.question=void 0,this.choices=void 0,this.answers=void 0,this.explanation=void 0,this.challengeType=c.length>1?a.MULTIPLE:a.SINGLE,this.index=t,this.question=n,this.choices=r,this.answers=c,this.explanation=l}return Object(f.a)(e,[{key:"getChallengeType",value:function(){return this.challengeType}},{key:"getIndex",value:function(){return this.index}},{key:"getQuestion",value:function(){return this.question}},{key:"setQuestion",value:function(e){this.question=e}},{key:"getChoices",value:function(){return this.choices}},{key:"setChoices",value:function(e){this.choices=e}},{key:"getAnswers",value:function(){return this.answers}},{key:"getExplanation",value:function(){return this.explanation}},{key:"setExplanation",value:function(e){this.explanation=e}},{key:"arrayEquals",value:function(e,t){var n=e.sort(),r=t.sort();return n.length===r.length&&n.every((function(e,t){return e===r[t]}))}}]),e}(),z=n(48),P=function(){function e(t){Object(h.a)(this,e),this.challenges=void 0,this.challenges=this.sanitizeChallenges(t)}return Object(f.a)(e,[{key:"getChallenges",value:function(){return this.challenges}},{key:"setChallenge",value:function(e){var t=e.getIndex();this.challenges.set(t,e)}},{key:"sanitizeChallenges",value:function(e){var t=Object(z.b)();return e.forEach((function(e){""!==e.getQuestion()&&e.getIndex()>0&&e.getAnswers().length>0&&e.getChoices().length>0&&(t=t.set(e.getIndex(),e))})),t}}]),e}(),S=function(){function e(t){Object(h.a)(this,e),this.content=void 0,this.challengeRawPartition=void 0,this.content=t,this.challengeRawPartition=this.partitionContent(t)}return Object(f.a)(e,[{key:"getContent",value:function(){return this.content}},{key:"getChallengeRawPartition",value:function(){if(void 0===this.challengeRawPartition)throw ReferenceError("Fail to get challenge raw partition.");return this.challengeRawPartition}},{key:"partitionContent",value:function(e){var t=e.match(/#{3,5}\s{0,1}Q{0,1}\.{0,1}\s{0,1}\d+(.|\n)*/g);if(null===t)throw new ReferenceError("Fail to partition content.");var n=(e=t[0]).split(/#{3,5}\s{0,1}/g);return n=n.filter((function(e){return e.split("\n").length>4})).map(M)}},{key:"extractQuestionIndex",value:function(e){var t,n=null===(t=(this.extractQuestion(e).match(/Q\d+/g)||[void 0])[0])||void 0===t?void 0:t.replace("Q","");return void 0===n?-1:parseInt(n)}},{key:"extractQuestion",value:function(e){var t,n=e.split("\n");return n.some((function(e,r){return!!e.match(/-\s{0,1}\[[x{0,1}|\s]\]/i)&&(t=n.slice(0,r).join("\n"),!0)})),void 0===t&&(t=""),M(t)}},{key:"extractAnswers",value:function(e){var t=e.match(/-\s{0,1}\[[x{0,1}|\s]\]/g),n=null===t||void 0===t?void 0:t.map((function(e){return!!e.match(/\[x\]/i)}));return(null===n||void 0===n?void 0:n.map((function(e,t){return e?t:-1})).filter((function(e){return-1!==e})))||[]}},{key:"extractChoices",value:function(e){var t=this.extractQuestion(e),n=M(e.replace(t,"")).trim().split(/-\s{0,1}\[[x{0,1}|\s]\]/gi).filter((function(e){return e})).map((function(e){return e.replace(/<{2,3}-{0,3}\s{0,1}CORRECT.*/gi,"")})).map((function(e){return e.replace(/<{2,3}-{0,3}\s{0,1}WRONG.*/gi,"")}));n=n.map(M);var r=this.extractExplanation(e),c=n[n.length-1].replace(r||"","");return n[n.length-1]=c,n}},{key:"extractExplanation",value:function(e){var t=this.extractQuestion(e),n=M(e.replace(t,"")).trim().split(/-\s{0,1}\[[x{0,1}|\s]\]/gi).filter((function(e){return e})),r=n[n.length-1].match(/\n{2,}.*$/g),c=r?r[0]:"";return""===c&&n.some((function(e){var t=e.match(/<{2,3}-{0,3}\s{0,1}CORRECT.*/i);return!!t&&(c=t[0].replace(/<{2,3}-{0,3}\s{0,1}CORRECT/i,""),!0)})),""!==c?M(c):void 0}},{key:"getQuestionCount",value:function(){var e;return(null===(e=this.challengeRawPartition)||void 0===e?void 0:e.length)||0}},{key:"getChallenge",value:function(e){var t=this.extractQuestionIndex(e),n=this.extractQuestion(e).replace(/Q\d+.\s{0,1}/g,""),r=this.extractAnswers(e),c=this.extractChoices(e),a=this.extractExplanation(e);return new R(t,n,c,r,a)}},{key:"getQuiz",value:function(){var e=this;if(void 0===this.challengeRawPartition)throw ReferenceError("Fail to get question.");var t=Object(z.b)();return this.challengeRawPartition.forEach((function(n){var r=e.getChallenge(n);t=t.set(r.getIndex(),r)})),new P(t)}}]),e}(),M=function(e){return e.trim().replace(/^\n+|\n+$/g,"")},T=n(74),A=n.n(T),F=n(254),D=n(255),Q=n.n(D),q=function(){var e=Object(F.a)(A.a.mark((function e(){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Q.a.get("https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/README.md").then((function(e){var t=e.data;return U(t)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(e){var t=e.match(/\| \[Adobe(.|\n)*\|/g);if(null===t)throw ReferenceError("Fail to fetch list of assessment.");return t[0].split("\n").map((function(e){var t,n=(e.match(/\[(.{1,40})\]/g)||["no-title"])[0],r=(e.match(/[a-zA-Z\-()/%1-9.]+.md/g)||[null])[0],c=parseInt((e.match(/=>(.*)questions/i)||["0","0"])[1]);return{title:n,url:r="https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master/"+(r=(null===(t=r)||void 0===t?void 0:t.replace(/^\(/g,""))||null),questionCount:c}})).filter((function(e){return"no-title"!==e.title}))},G=n(60);function B(){return(B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function H(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function _(e,t){var n=e.title,r=e.titleId,c=H(e,["title","titleId"]);return l.createElement("svg",B({id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 512 512",xmlSpace:"preserve",ref:t,"aria-labelledby":r},c),n?l.createElement("title",{id:r},n):null,m||(m=l.createElement("g",null,l.createElement("path",{d:"M360.828,384.339c1.705-1.374,2.798-3.478,2.798-5.839c0-0.066,0-341,0-341c0-4.143-3.357-7.5-7.5-7.5H139.141 C133.79,12.647,117.605,0,98.52,0C79.742,0,63.311,12.514,57.906,30H33.874c-4.143,0-7.5,3.357-7.5,7.5v425 c0,4.143,3.357,7.5,7.5,7.5h238.187c2.425,0,4.527-1.092,5.902-2.794L360.828,384.339z M279.626,444.328V386h58.327 L279.626,444.328z M98.52,15c10.663,0,19.922,6.105,24.482,15H74.036C78.64,21.052,88.011,15,98.52,15z M41.374,45h84.646v52.5 c0,6.893-5.607,12.5-12.5,12.5s-12.5-5.607-12.5-12.5v-30c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v30 c0,15.163,12.337,27.5,27.5,27.5s27.5-12.337,27.5-27.5V45h207.606v326h-76.5c-4.143,0-7.5,3.357-7.5,7.5V455H41.374V45z"}),l.createElement("path",{d:"M296.126,345.5c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H93.874c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5 H296.126z"}),l.createElement("path",{d:"M93.874,300.5h202.252c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H93.874c-4.143,0-7.5,3.357-7.5,7.5 S89.731,300.5,93.874,300.5z"}),l.createElement("path",{d:"M93.874,255.5h202.252c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H93.874c-4.143,0-7.5,3.357-7.5,7.5 S89.731,255.5,93.874,255.5z"}),l.createElement("path",{d:"M93.874,210.5h202.252c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H93.874c-4.143,0-7.5,3.357-7.5,7.5 S89.731,210.5,93.874,210.5z"}),l.createElement("path",{d:"M93.874,165.5h202.252c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H93.874c-4.143,0-7.5,3.357-7.5,7.5 S89.731,165.5,93.874,165.5z"}),l.createElement("path",{d:"M396.126,30h-10c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h2.5v410h-80.072c-4.143,0-7.5,3.357-7.5,7.5 s3.357,7.5,7.5,7.5h87.572c4.143,0,7.5-3.357,7.5-7.5v-425C403.626,33.357,400.269,30,396.126,30z"}),l.createElement("path",{d:"M436.126,30h-10c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h2.5v410h-2.5c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5 h10c4.143,0,7.5-3.357,7.5-7.5v-425C443.626,33.357,440.269,30,436.126,30z"}))),b||(b=l.createElement("g",null)),j||(j=l.createElement("g",null)),g||(g=l.createElement("g",null)),x||(x=l.createElement("g",null)),p||(p=l.createElement("g",null)),v||(v=l.createElement("g",null)),O||(O=l.createElement("g",null)),y||(y=l.createElement("g",null)),w||(w=l.createElement("g",null)),E||(E=l.createElement("g",null)),C||(C=l.createElement("g",null)),k||(k=l.createElement("g",null)),N||(N=l.createElement("g",null)),I||(I=l.createElement("g",null)),L||(L=l.createElement("g",null)))}var V,W=l.forwardRef(_),Z=(n.p,n(2)),K=function(e){var t=e.assessmentInfo.title.replace(/\[|\]/g,""),n=e.assessmentInfo.url;return Object(Z.jsxs)("div",{className:"flex items-center",children:[Object(Z.jsx)(G.b,{className:"w-full h-full",to:"/practice/".concat(btoa(n)),children:Object(Z.jsx)("div",{className:"p-2 m-1 bg-secondary-500 dark:bg-gray-800 font-bold text-gray-100 rounded-sm shadow text-xs sm:text-sm",children:Object(Z.jsx)("p",{children:t})})}),Object(Z.jsx)("a",{className:"hidden sm:inline content-center",target:"_blank",rel:"noreferrer",href:n,children:Object(Z.jsx)(W,{className:"w-10 h-10 p-1 m-1 bg-secondary-500 dark:bg-gray-800 font-bold fill-current text-gray-100 rounded-sm shadow text-xs"})})]})},$=function(e){var t,n=Object(l.useState)(),c=Object(u.a)(n,2),a=c[0],s=c[1],i=Object(l.useState)(),o=Object(u.a)(i,2),d=o[0],h=o[1];Object(l.useEffect)((function(){var e=["[Adobe-Acrobat]","[Microsoft Access]","[Microsoft Outlook]","[QuickBooks]"];r.getAssessmentInfos().then((function(t){var n=t.filter((function(t){return!e.includes(t.title)}));s(n)}))}),[]);return Object(Z.jsxs)("div",{className:"flex flex-col justify-center ".concat(e.className),children:[Object(Z.jsx)("div",{id:"searchbar-for-linkedin",className:"w-full h-10 pl-3 pr-2 bg-gray-50 dark:bg-gray-800 border-2 rounded-full flex justify-between items-center relative",children:Object(Z.jsx)("input",{type:"search",name:"filter-assessment",id:"filter-assessment",autoComplete:"off",placeholder:"Filter LinkedIn Assessment",className:"bg-gray-50 dark:bg-gray-800 w-full outline-none focus:outline-none active:outline-none",onChange:function(e){return function(e){h(e.target.value)}(e)}})}),Object(Z.jsx)("div",{id:"linkedin-assessment-lists",className:"mt-4",children:Object(Z.jsx)("ul",{children:null===(t=null===a||void 0===a?void 0:a.filter((function(e){return e.title.toLowerCase().includes(d||"")})))||void 0===t?void 0:t.map((function(e,t){return Object(Z.jsx)("li",{children:Object(Z.jsx)(K,{assessmentInfo:e})},t)}))})})]})},J="dark",X=s.a.createContext({theme:J,setTheme:function(e){return console.log("setTheme function is null. ".concat(e))}}),Y=function(e){var t=e.children,n=s.a.useState(function(){if("undefined"!==typeof window&&window.localStorage){var e=window.localStorage.getItem("color-theme");if("string"===typeof e)return e;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return J}()),r=Object(u.a)(n,2),c=r[0],a=r[1],l=function(e){var t=window.document.documentElement,n="dark"===e;t.classList.remove(n?"light":"dark"),t.classList.add(e),localStorage.setItem("color-theme",e)};return c&&l(c),s.a.useEffect((function(){l(c)}),[c]),Object(Z.jsx)(X.Provider,{value:{theme:c,setTheme:a},children:t})},ee=function(){var e=Object(d.e)(),t=Object(l.useContext)(X),n=t.theme,r=t.setTheme;return Object(Z.jsxs)("div",{className:"z-50 flex justify-between md:px-10 bg-gray-100 dark:bg-gray-900",children:[Object(Z.jsxs)("button",{className:"m-2 p-2 text-lg uppercase font-bold focus:outline-none",onClick:function(){return e.push("/")},children:[Object(Z.jsx)("span",{className:"text-primary-500",children:"MD2"}),"Practice"]}),Object(Z.jsx)("div",{className:"m-2 my-4",children:Object(Z.jsx)("button",{className:"p-2 text-md bold border-4 rounded-lg capitalize border-gray-700 dark:border-gray-100 focus:outline-none",onClick:function(){r("dark"===n?"light":"dark")},children:"".concat("dark"===n?"light":"dark"," Theme")})})]})},te=n.p+"static/media/questionnaire.da1f0384.svg";function ne(){return(ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function re(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function ce(e,t){var n=e.title,r=e.titleId,c=re(e,["title","titleId"]);return l.createElement("svg",ne({xmlns:"http://www.w3.org/2000/svg",height:"511pt",viewBox:"-53 1 511 511.99906",width:"511pt",ref:t,"aria-labelledby":r},c),n?l.createElement("title",{id:r},n):null,V||(V=l.createElement("g",{id:"surface1"},l.createElement("path",{d:"M 276.410156 3.957031 C 274.0625 1.484375 270.84375 0 267.507812 0 L 67.777344 0 C 30.921875 0 0.5 30.300781 0.5 67.152344 L 0.5 444.84375 C 0.5 481.699219 30.921875 512 67.777344 512 L 338.863281 512 C 375.71875 512 406.140625 481.699219 406.140625 444.84375 L 406.140625 144.941406 C 406.140625 141.726562 404.65625 138.636719 402.554688 136.285156 Z M 279.996094 43.65625 L 364.464844 132.328125 L 309.554688 132.328125 C 293.230469 132.328125 279.996094 119.21875 279.996094 102.894531 Z M 338.863281 487.265625 L 67.777344 487.265625 C 44.652344 487.265625 25.234375 468.097656 25.234375 444.84375 L 25.234375 67.152344 C 25.234375 44.027344 44.527344 24.734375 67.777344 24.734375 L 255.261719 24.734375 L 255.261719 102.894531 C 255.261719 132.945312 279.503906 157.0625 309.554688 157.0625 L 381.40625 157.0625 L 381.40625 444.84375 C 381.40625 468.097656 362.113281 487.265625 338.863281 487.265625 Z M 338.863281 487.265625 "}),l.createElement("path",{d:"M 305.101562 401.933594 L 101.539062 401.933594 C 94.738281 401.933594 89.171875 407.496094 89.171875 414.300781 C 89.171875 421.101562 94.738281 426.667969 101.539062 426.667969 L 305.226562 426.667969 C 312.027344 426.667969 317.59375 421.101562 317.59375 414.300781 C 317.59375 407.496094 312.027344 401.933594 305.101562 401.933594 Z M 305.101562 401.933594 "}),l.createElement("path",{d:"M 140 268.863281 L 190.953125 214.074219 L 190.953125 349.125 C 190.953125 355.925781 196.519531 361.492188 203.320312 361.492188 C 210.125 361.492188 215.6875 355.925781 215.6875 349.125 L 215.6875 214.074219 L 266.640625 268.863281 C 269.113281 271.457031 272.332031 272.820312 275.667969 272.820312 C 278.636719 272.820312 281.730469 271.707031 284.078125 269.480469 C 289.027344 264.78125 289.398438 256.988281 284.699219 252.042969 L 212.226562 174.253906 C 209.875 171.78125 206.660156 170.296875 203.199219 170.296875 C 199.734375 170.296875 196.519531 171.78125 194.171875 174.253906 L 121.699219 252.042969 C 117 256.988281 117.371094 264.902344 122.316406 269.480469 C 127.511719 274.179688 135.300781 273.808594 140 268.863281 Z M 140 268.863281 "}))))}var ae=l.forwardRef(ce),le=(n.p,function(e){return Object(Z.jsxs)("span",{className:"flex justify-center ml-2 w-1/3 p-1 text-gray-100 bg-secondary-500 shadow rounded-full border-2 border-gray-300 dark:border-gray-100",children:[Object(Z.jsxs)("label",{htmlFor:"file-upload",className:"flex justify-center cursor-pointer items-center w-full",children:[Object(Z.jsx)("p",{className:"font-semibold text-xs hidden lg:block mr-1",children:"Upload File"}),Object(Z.jsx)(ae,{className:"fill-current text-gray-100",width:"24px",height:"24px"})]}),Object(Z.jsx)("input",{className:"hidden",id:"file-upload",type:"file",name:"file-upload",onChange:e.handleFileUpload})]})}),se=function(){var e=Object(d.e)(),t=Object(l.useState)(""),n=Object(u.a)(t,2),r=n[0],c=n[1],a=function(){r?e.push({pathname:"/practice/".concat(btoa(r)),state:{content:"",inputType:"URL"}}):alert("Key in URL")};return Object(Z.jsxs)("div",{children:[Object(Z.jsx)(ee,{}),Object(Z.jsx)("section",{className:"mt-10",children:Object(Z.jsxs)("div",{className:"flex justify-around px-10",children:[Object(Z.jsxs)("div",{className:"flex flex-col w-1/2 justify-center justify-items-center text-center",children:[Object(Z.jsx)("span",{className:"text-md md:text-4xl lg:text-6xl font-bold",children:"Simple Practice Test Engine"}),Object(Z.jsx)("span",{className:"text-xs md:text-2xl lg:text-4xl fond-semibold text-gray-400",children:"Convert MD File to Q&A for Practice"})]}),Object(Z.jsx)("div",{className:"flex justify-center justify-items-center text-center",children:Object(Z.jsx)("img",{className:"w-full h-full",src:te,alt:"questionnaire-logo"})})]})}),Object(Z.jsx)("section",{className:"md:w-2/3 md:m-auto",children:Object(Z.jsxs)("div",{className:"flex flex-col mx-10 my-20 justify-center justify-items-center",children:[Object(Z.jsxs)("div",{className:"flex",children:[Object(Z.jsxs)("div",{className:"w-full h-10 pl-3 pr-2 bg-gray-50 dark:bg-gray-800 border-2 rounded-full flex justify-between items-center relative",children:[Object(Z.jsx)("input",{onChange:function(e){return c(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&a()},value:r,type:"search",name:"md-url",autoComplete:"off",id:"md-url-submit",placeholder:"URL or MD File Upload",className:"bg-gray-50 dark:bg-gray-800 w-full outline-none focus:outline-none active:outline-none"}),Object(Z.jsx)("button",{onClick:a,type:"submit","aria-label":"url-button",className:"ml-1 outline-none focus:outline-none active:outline-none",children:Object(Z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(Z.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"})})})]}),Object(Z.jsx)(le,{handleFileUpload:function(t){if(t.target.files){var n=t.target.files[0];c("File Selected: ".concat(n.name)),n.text().then((function(t){e.push({pathname:"/practice",state:{content:t,inputType:"FILE"}})}))}}})]}),Object(Z.jsx)("div",{className:"text-lg uppercase text-center my-2 pb-2 border-b-2 border-primary-700",children:"OR"}),Object(Z.jsxs)("div",{className:"mt-4 font-bold flex justify-center",children:[Object(Z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"animate-bounce mr-2 h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:Object(Z.jsx)("path",{fillRule:"evenodd",d:"M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),Object(Z.jsx)("a",{className:"text-xs sm:hidden font-bold",target:"_blank",rel:"noreferrer",href:"https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes",children:"LinkedIn Assessment"}),Object(Z.jsx)("a",{className:"hidden text-sm sm:block font-bold hover:underline",target:"_blank",rel:"noreferrer",href:"https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes",children:"LinkedIn Assessment Practice [Click Me For Source]"}),Object(Z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"animate-bounce ml-2 h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:Object(Z.jsx)("path",{fillRule:"evenodd",d:"M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z",clipRule:"evenodd"})})]}),Object(Z.jsx)($,{className:"mt-4"})]})})]})},ie=n(78),oe=n(20),ue=l.createContext(void 0),de=l.createContext(void 0);var he,fe,me,be,je,ge,xe,pe,ve,Oe,ye,we,Ee,Ce,ke,Ne,Ie=function(e,t){switch(t.type){case"submitAnswer":var n=null,r=e.session,a=t.challengeIdx,l=e.practice,s=null===l||void 0===l?void 0:l.getChallenges().get(a);if(void 0===s)throw new Error("Practice object is null or undefined");return n=function(e,t){var n,r={},c=Object(oe.a)(e);try{for(c.s();!(n=c.n()).done;){var a=n.value;r[a+typeof a]=1}}catch(d){c.e(d)}finally{c.f()}var l,s=Object(oe.a)(t);try{for(s.s();!(l=s.n()).done;){var i=l.value,o=i+typeof i;if(!r[o])return!1;r[o]=2}}catch(d){s.e(d)}finally{s.f()}for(var u in r)if(1===r[u])return!1;return!0}(s.getAnswers(),t.selected)?r.set(a,{status:c.CORRECT,selected:t.selected}):r.set(a,{status:c.WRONG,selected:t.selected}),Object(ie.a)(Object(ie.a)({},e),{},{session:n});default:throw new Error("Unhandled action type")}},Le=function(e){var t=e.children,n=e.practice,r=Object(z.b)();n.getChallenges().forEach((function(e,t){return r=r.set(t,{status:c.IDLE,selected:[]})}));var a=l.useReducer(Ie,{practice:n,session:r}),s=Object(u.a)(a,2),i=s[0],o=s[1];return Object(Z.jsx)(ue.Provider,{value:i,children:Object(Z.jsx)(de.Provider,{value:o,children:t})})},Re=function(){var e=l.useContext(ue);if(void 0===e)throw new Error("usePracticeState must be used within a PracticeProvider");return e},ze=n(257),Pe=n(258),Se=n.n(Pe),Me=n(798),Te=n(792),Ae={code:function(e){var t=e.inline,n=e.className,r=e.children,c=Object(ze.a)(e,["inline","className","children"]),a=/language-(\w+)/.exec(n||"");return!t&&a?Object(Z.jsx)(Me.a,Object(ie.a)({className:"".concat(n," pointer-events-auto"),style:Te.a,language:a[1],PreTag:"div",children:String(r).replace(/\n$/,"")},c)):Object(Z.jsx)("code",Object(ie.a)({className:"".concat(n),children:r},c))}},Fe=function(e){return Object(Z.jsx)(Se.a,{components:Ae,children:e.content})},De=s.a.memo(Fe),Qe=function(e){var t,n=e.challenge,r=n.getIndex(),s=n.getChallengeType(),i=Re(),o=function(){var e=l.useContext(de);if(void 0===e)throw new Error("usePracticeDispatch must be used within a PracticeProvider");return e}(),d=Object(z.a)();n.getChoices().forEach((function(e,t){return d.set(t,!1)}));var h=Object(l.useState)(Object(z.a)(d)),f=Object(u.a)(h,2),m=f[0],b=f[1],j=null===(t=i.session.get(r))||void 0===t?void 0:t.status,g=function(e){var t=parseInt(e.target.value);if(j===c.IDLE)switch(s){case a.SINGLE:b(d.set(t,!0));break;case a.MULTIPLE:b((function(e){return e.set(t,!e.get(t))}))}},x=function(e){switch(s){case a.SINGLE:case a.MULTIPLE:return m.get(e)||!1}},p=function(e){return j===c.IDLE?"":n.getAnswers().includes(e)?"bg-gradient-to-r from-green-500 pointer-events-none":j===c.WRONG&&m.get(e)?"bg-gradient-to-r from-red-500 pointer-events-none":"pointer-events-none"};return Object(Z.jsxs)("div",{className:"block p-2 text-xs mx-10 my-4 md:text-base border rounded-lg shadow dark:bg-gray-800",children:[Object(Z.jsx)("div",{className:"border-primary-400 border-b-2 p-2 pb-4 overflow-x-auto",children:Object(Z.jsx)(De,{content:"Q".concat(n.getIndex(),". ").concat(n.getQuestion())})}),Object(Z.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=[];switch(s){case a.SINGLE:case a.MULTIPLE:t=m.filter((function(e){return e})).keySeq().toArray(),o({type:"submitAnswer",challengeIdx:r,selected:t})}},children:[Object(Z.jsx)("div",{className:"flex-col my-5",role:"group",children:n.getChoices().map((function(e,t){return Object(Z.jsx)(qe,{className:"flex p-2 rounded-l-full ".concat(p(t)),choice:e,inputType:s===a.SINGLE?"radio":"checkbox",inputChecked:x(t),inputValue:t,handleOnValueChanged:g},t)}))}),Object(Z.jsx)("button",{className:"block p-2 font-bold uppercase transition duration-200 ease-in-out ".concat(j===c.IDLE?"bg-primary-400":j===c.CORRECT?"bg-green-400 pointer-events-none":j===c.WRONG?"bg-red-400 pointer-events-none":void 0," text-gray-100 rounded-lg m-1 transform xl:hover:-translate-y-1 xl:hover:scale-110 xl:hover:bg-primary-600 focus:outline-none"),type:"submit",children:"CHECK"})]})]})},qe=s.a.memo((function(e){return Object(Z.jsx)("div",{className:e.className,children:Object(Z.jsxs)("label",{className:"flex w-full items-center overflow-x-auto",children:[Object(Z.jsx)("input",{type:e.inputType,name:"choices",value:e.inputValue,checked:e.inputChecked,onChange:e.handleOnValueChanged}),Object(Z.jsx)("span",{className:"w-full mx-2",children:Object(Z.jsx)(De,{content:e.choice})})]})})})),Ue=s.a.memo(Qe),Ge=function(e){var t=e.show,n=e.onShowChanged;return Object(Z.jsx)(Z.Fragment,{children:t?Object(Z.jsxs)(Z.Fragment,{children:[Object(Z.jsx)("div",{onClick:n,className:"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",children:Object(Z.jsx)("div",{onClick:function(e){return e.stopPropagation()},className:"relative w-auto my-6 mx-auto max-w-3xl",children:Object(Z.jsx)("div",{className:"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-800 outline-none focus:outline-none",children:e.children})})}),Object(Z.jsx)("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):null})};function Be(){return(Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function He(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function _e(e,t){var n=e.title,r=e.titleId,c=He(e,["title","titleId"]);return l.createElement("svg",Be({id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 491.398 491.398",style:{enableBackground:"new 0 0 491.398 491.398"},xmlSpace:"preserve",ref:t,"aria-labelledby":r},c),n?l.createElement("title",{id:r},n):null,he||(he=l.createElement("g",null,l.createElement("g",{id:"Icons_19_"},l.createElement("path",{d:"M481.765,220.422L276.474,15.123c-16.967-16.918-44.557-16.942-61.559,0.023L9.626,220.422 c-12.835,12.833-12.835,33.65,0,46.483c12.843,12.842,33.646,12.842,46.487,0l27.828-27.832v214.872 c0,19.343,15.682,35.024,35.027,35.024h74.826v-97.62c0-7.584,6.146-13.741,13.743-13.741h76.352 c7.59,0,13.739,6.157,13.739,13.741v97.621h74.813c19.346,0,35.027-15.681,35.027-35.024V239.091l27.812,27.815 c6.425,6.421,14.833,9.63,23.243,9.63c8.408,0,16.819-3.209,23.242-9.63C494.609,254.072,494.609,233.256,481.765,220.422z"})))),fe||(fe=l.createElement("g",null)),me||(me=l.createElement("g",null)),be||(be=l.createElement("g",null)),je||(je=l.createElement("g",null)),ge||(ge=l.createElement("g",null)),xe||(xe=l.createElement("g",null)),pe||(pe=l.createElement("g",null)),ve||(ve=l.createElement("g",null)),Oe||(Oe=l.createElement("g",null)),ye||(ye=l.createElement("g",null)),we||(we=l.createElement("g",null)),Ee||(Ee=l.createElement("g",null)),Ce||(Ce=l.createElement("g",null)),ke||(ke=l.createElement("g",null)),Ne||(Ne=l.createElement("g",null)))}var Ve,We=l.forwardRef(_e),Ze=(n.p,n(793)),Ke=n(799),$e=n(283),Je=n(278),Xe=["#00C49F","#B91C1C"],Ye=Math.PI/180,et=function(e){var t=e.data;return Object(Z.jsx)(Z.Fragment,{children:Object(Z.jsx)(Ze.a,{width:"100%",height:"100%",children:Object(Z.jsx)(Ke.a,{width:400,height:400,children:Object(Z.jsx)($e.a,{data:t,cx:"50%",cy:"50%",labelLine:!1,label:function(e){var n=e.cx,r=e.cy,c=e.midAngle,a=e.innerRadius,l=e.outerRadius,s=e.percent,i=e.index,o=a+.3*(l-a),u=n+o*Math.cos(-c*Ye),d=r+o*Math.sin(-c*Ye);return Object(Z.jsx)("text",{className:"text-xs",x:u,y:d,fill:"white",textAnchor:u>n?"start":"end",dominantBaseline:"central",children:"".concat((100*s).toFixed(0),"%[").concat(t[i].value,"]")})},outerRadius:80,fill:"#8884d8",dataKey:"value",children:t.map((function(e,t){return Object(Z.jsx)(Je.a,{fill:Xe[t%Xe.length]},"cell-".concat(t))}))})})})})},tt=function(e){var t=e.sessionData,n=t.filter((function(e){return e.status===c.IDLE})).count(),r=[{name:"Correct",value:t.filter((function(e){return e.status===c.CORRECT})).count()},{name:"Wrong",value:t.filter((function(e){return e.status===c.WRONG})).count()}],a=r.reduce((function(e,t){return e+t.value}),0),l=function(){return Object(Z.jsx)(Z.Fragment,{children:0!==a?Object(Z.jsx)("div",{className:"h-40 md:60",children:Object(Z.jsx)(et,{data:r})}):Object(Z.jsx)("p",{className:"p-2 py-4 text-center",children:"No Data Available Yet."})})};return Object(Z.jsxs)("div",{className:"flex mt-5 justify-around ",children:[Object(Z.jsxs)("div",{className:"w-full md:w-2/3",children:[Object(Z.jsxs)("div",{className:"md:hidden p-1 font-bold",children:["FINISHED: ",Object(Z.jsx)("span",{className:"font-normal",children:a})]}),Object(Z.jsxs)("div",{className:"md:hidden p-1 font-bold",children:["IDLE: ",Object(Z.jsx)("span",{className:"font-normal",children:n})]}),Object(Z.jsx)(l,{})]}),Object(Z.jsxs)("div",{className:"justify-around items-center hidden md:flex md:flex-col text-center",children:[Object(Z.jsxs)("div",{className:"shadow w-full border-2 p-2 rounded-lg border-gray-400",children:[Object(Z.jsx)("p",{className:"border-b-2 p-2 border-gray-400 font-bold",children:"FINISHED"}),Object(Z.jsx)("p",{className:"p-2",children:a})]}),Object(Z.jsxs)("div",{className:"shadow w-full border-2 p-2 rounded-lg border-gray-400",children:[Object(Z.jsx)("p",{className:"border-b-2 p-2 border-gray-400 font-bold",children:"IDLE"}),Object(Z.jsx)("p",{className:"p-2",children:n})]})]})]})},nt=function(){return Object(Z.jsx)(G.b,{to:"/",children:Object(Z.jsxs)("button",{className:"inline-flex rounded-full shadow items-center p-3 dark:bg-gray-700 dark:hover:bg-gray-900 bg-gray-200 hover:bg-gray-300",children:[Object(Z.jsx)("span",{children:"HOMEPAGE"}),Object(Z.jsx)(We,{className:"ml-2 w-5 h-5 dark:text-white text-gray-900 fill-current"})]})})},rt=function(e){var t=e.sessionData,n=function(e){switch(e){case c.CORRECT:return"text-green-500 font-extrabold";case c.WRONG:return"text-red-500 font-extrabold";default:return"font-normal"}};return Object(Z.jsxs)("div",{className:"p-2",children:[Object(Z.jsx)(nt,{}),Object(Z.jsx)(tt,{sessionData:t}),Object(Z.jsx)("div",{className:"p-1 overflow-y-scroll no-scrollbar h-60",children:Object(Z.jsx)("div",{className:"grid grid-flow-row-dense grid-cols-5 md:grid-cols-9 xl:grid-cols-12 gap-4",children:t.entrySeq().map((function(t){var r=Object(u.a)(t,2),c=r[0],a=r[1];return Object(Z.jsx)("span",{className:"cursor-pointer p-1 text-center font-thin border-transparent border-b-2 rounded-md hover:border-primary-700 dark:hover:border-gray-100 ".concat(n(a.status)),onClick:function(){return e.onClickItem(c)},children:c},c)}))})})]})};function ct(){return(ct=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function at(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}function lt(e,t){var n=e.title,r=e.titleId,c=at(e,["title","titleId"]);return l.createElement("svg",ct({id:"Capa_1",enableBackground:"new 0 0 512 512",viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},c),n?l.createElement("title",{id:r},n):null,Ve||(Ve=l.createElement("g",null,l.createElement("g",null,l.createElement("path",{d:"m452 276h-116c-33.084 0-60 26.916-60 60v116c0 33.084 26.916 60 60 60h116c33.084 0 60-26.916 60-60v-116c0-33.084-26.916-60-60-60zm20 176c0 11.028-8.972 20-20 20h-116c-11.028 0-20-8.972-20-20v-116c0-11.028 8.972-20 20-20h116c11.028 0 20 8.972 20 20zm-296-176h-116c-33.084 0-60 26.916-60 60v116c0 33.084 26.916 60 60 60h116c33.084 0 60-26.916 60-60v-116c0-33.084-26.916-60-60-60zm20 176c0 11.028-8.972 20-20 20h-116c-11.028 0-20-8.972-20-20v-116c0-11.028 8.972-20 20-20h116c11.028 0 20 8.972 20 20zm-20-452h-116c-33.084 0-60 26.916-60 60v116c0 33.084 26.916 60 60 60h116c33.084 0 60-26.916 60-60v-116c0-33.084-26.916-60-60-60zm20 176c0 11.028-8.972 20-20 20h-116c-11.028 0-20-8.972-20-20v-116c0-11.028 8.972-20 20-20h116c11.028 0 20 8.972 20 20zm256-176h-116c-33.084 0-60 26.916-60 60v116c0 33.084 26.916 60 60 60h116c33.084 0 60-26.916 60-60v-116c0-33.084-26.916-60-60-60zm20 176c0 11.028-8.972 20-20 20h-116c-11.028 0-20-8.972-20-20v-116c0-11.028 8.972-20 20-20h116c11.028 0 20 8.972 20 20z"})))))}var st=l.forwardRef(lt),it=(n.p,function(){var e=Re(),t=e.practice,n=Object(l.useState)(!1),r=Object(u.a)(n,2),c=r[0],a=r[1],i=null===t||void 0===t?void 0:t.getChallenges().reduce((function(e,t){return e[t.getIndex()]=s.a.createRef(),e}),{});return Object(Z.jsxs)("div",{className:"dark:text-gray-100",children:[Object(Z.jsx)(ee,{}),Object(Z.jsx)("div",{className:"flex-col justify-items-center pt-2 select-none",children:Object(Z.jsx)("ul",{children:t&&i?t.getChallenges().valueSeq().map((function(e){return Object(Z.jsx)("li",{ref:i[e.getIndex()],children:Object(Z.jsx)(Ue,{challenge:e})},e.getIndex())})):null})}),Object(Z.jsx)("button",{onClick:function(){return a(!0)},className:"bg-secondary-500 p-3 w-12 shadow rounded-full fixed bottom-5 right-5 focus:outline-none",children:Object(Z.jsx)(st,{className:"fill-current text-white"})}),Object(Z.jsx)(Ge,{show:c,onShowChanged:function(){return a(!c)},children:Object(Z.jsx)(rt,{sessionData:e.session,onClickItem:function(e){var t;(a(!c),i)&&window.scrollTo({top:null===(t=i[e].current)||void 0===t?void 0:t.offsetTop,behavior:"smooth"})}})})]})}),ot=s.a.memo(it),ut=function(){var e=Object(d.e)(),t=Object(d.f)(),n=Object(d.g)().encodedUrl,r=Object(l.useState)(),c=Object(u.a)(r,2),a=c[0],s=c[1],i=function(e){try{var t=new S(e).getQuiz();if(0===t.getChallenges().size)throw Error("No Challenge Detected.");s(t)}catch(n){throw Error("Content is not in expected format.")}};return Object(l.useEffect)((function(){if(t.state&&"FILE"===t.state.inputType)i(t.state.content);else if(n){var r=atob(n);fetch(r).then((function(e){return e.text()})).then((function(e){var t=r.split("/").slice(0,-1).join("/");e=e.replace(/^!.*\((?!http)/gm,"![imagepath](".concat(t,"/")).replace("?raw=true",""),i(e)})).catch((function(){alert("fail to load practice."),e.push("/")}))}else e.push("/")}),[n,e,t]),Object(Z.jsx)(Z.Fragment,{children:a?Object(Z.jsx)(Le,{practice:a,children:Object(Z.jsx)(ot,{})}):null})},dt=n(80),ht=n.n(dt),ft=n(281);var mt=function(){var e=function(){var e;e="UA-197929921-1",ft.a(e)};return Object(l.useEffect)((function(){"true"===Object(dt.getCookieConsentValue)()&&e()}),[]),Object(Z.jsxs)("div",{children:[Object(Z.jsx)(Y,{children:Object(Z.jsxs)(G.a,{basename:"/",children:[Object(Z.jsx)(d.a,{exact:!0,path:"/",component:se}),Object(Z.jsx)(d.a,{exact:!0,path:"/practice",component:ut}),Object(Z.jsx)(d.a,{path:"/practice/:encodedUrl",component:ut})]})}),Object(Z.jsx)(ht.a,{enableDeclineButton:!0,onAccept:e,onDecline:function(){dt.Cookies.remove("_ga"),dt.Cookies.remove("_gat"),dt.Cookies.remove("_gid")},children:"This website uses cookies to count page views for motivation. Close for better experiences."})]})},bt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,800)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,l=t.getTTFB;n(e),r(e),c(e),a(e),l(e)}))};o.a.render(Object(Z.jsx)(s.a.StrictMode,{children:Object(Z.jsx)(mt,{})}),document.getElementById("root")),bt()}},[[788,1,2]]]);
//# sourceMappingURL=main.534f6ea5.chunk.js.map