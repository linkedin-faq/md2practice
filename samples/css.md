## CSS

#### Q1. In the following example, which selector has the highest specificity ranking for selecting the anchor link element?

```css
ul li a
a
.example a
div a
```

- [x] `.example a`
- [ ] `div a`
- [ ] `a`
- [ ] `ul li a`

Explain: This is the explanation.

#### Q2. Using an attribute selector, how would you select an `<a>` element with a "title" attribute?

- [x] a[title]{...}
- [ ] a > title {...}
- [ ] a.title {...}
- [ ] a=title {...}


#### Q3. Describe what the following git commands do to the commit history.
```bash
git reset --hard HEAD~5
git merge --squash HEAD@{1}
```
- [ ] Reset the HEAD to the 5th commit in the repo, then merges to the master branch
- [x] Reset the commit branch back before the last 5 commits, then squashes them into a single commit
- [ ] Delete the last 5 commits
- [ ] Merges the last 5 commits into a new branch

`git reset --hard HEAD~5` resets the current branch to the commit just before the last 5 (see `man gitrevisions` for details about this notation and other cool alternatives like `HEAD@{2 days ago}`). As it is a hard reset, it will also overwrite every change in the working tree as well. See `man git-reset`.

`git merge --squash HEAD@{1}` HEAD@{1} is where the branch was just before the previous command (again, see `man gitrevisions`). This command sets the state of the index to be as it would just after a merge from that commit. This whole operation could be a way to take 5 commits from a branch in which you started a new feature and squash them to a single commit, a meaningful one.

#### Q4. What element(s) do the following selectors match to?

`1) .nav {...}`
`2) nav {...}`
`3) #nav {...}`

- [ ]

```markdown
1. An element with an ID of "nav"
2. A nav element
3. An element with a class of "nav"
```

- [ ]

```markdown
They all target the same nav element.
```

- [x]

```markdown
1. An element with an class of "nav"
2. A nav element
3. An element with a id of "nav"
```

- [ ]

```markdown
1. An element with an class of "nav"
2. A nav element
3. An div with a id of "nav"
```

#### Q5. When adding transparency styles, what is the difference between using the opacity property versus the background property with an `rgba()` value?

- [ ] Opacity specifies the level of transparency of the child elements. Background with an `rgba()` value applies transparency to the background color only.
- [ ] Opacity applies transparency to the background color only. Background with an `rgba()` value specifies the level of transparency of an element, as a whole, including its content.
- [x] Opacity specifies the level of transparency of an element, including its content. Background with an `rgba()` value applies transparency to the background color only.
- [ ] Opacity applies transparency to the parent and child elements. Background with an `rgba()` value specifies the level of transparency of the parent element only.

#### Q6. What is true of block and inline elements? (_Alternative_: Which statement about block and inline elements is true?)

- [ ] By default, block elements are the same height and width as the content container between their tags; inline elements span the entire width of its container.
- [x] By default, block elements span the entire width of its container; inline elements are the same height and width as the content contained between their tags.
- [ ] A `<nav>` element is an example of an inline element. `<header>` is an example of a block element.
- [ ] A `<span>` is an example of a block element. `<div>` is an example of an inline element.

#### Q7. CSS grid introduced a new length unit, fr, to create flexible grid tracks. Referring to the code sample below, what will the widths of the three columns be?

```css
.grid {
  display: grid;
  width: 500px;
  grid-template-columns: 50px 1fr 2fr;
}
```

- [ ] The first column will have a width of 50px. The second column will be 50px wide and the third column will be 100px wide.
- [x] The first column will have a width of 50px. The second column will be 150px wide and the third column will be 300px wide.
- [ ] The first column will have a width of 50px. The second column will be 300px wide and the third column will be 150px wide.
- [ ] The first column will have a width of 50px. The second column will be 500px wide and the third column will be 1000px wide.

#### Q8. What is the line-height property primarily used for?

- [x] to control the height of the space between two lines of content
- [ ] to control the height of the space between heading elements
- [ ] to control the height of the character size
- [ ] to control the width of the space between characters

#### Q9. Three of these choices are true about class selectors. Which is NOT true?

- [ ] Multiple classes can be used within the same element.
- [ ] The same class can be used multiple times per page.
- [ ] Class selectors with a leading period
- [x] Classes can be used multiple times per page but not within the same element.

#### Q10. There are many properties that can be used to align elements and create page layouts such as float, position, flexbox and grid. Of these four properties, which one should be used to align a global navigation bar which stays fixed at the top of the page?

- [x] position
- [ ] flexbox
- [ ] grid
- [ ] float

#### Q11. In the shorthand example below, which individual background properties are represented?

`background: blue url(image.jpg) no-repeat scroll 0px 0px;`

- [x]

```css
background-color: blue;
background-image: url(image.jpg);
background-repeat: no-repeat;
background-attachment: scroll;
background-position: 0px 0px;
```

- [ ]

```css
background-color: blue;
background-img: url(image.jpg);
background-position: no-repeat;
background-scroll: scroll;
background-size: 0px 0px;
```

- [ ]

```css
background-color: blue;
background-src: url(image.jpg);
background-repeat: no-repeat;
background-wrap: scroll;
background-position: 0px 0px;
```

- [ ]

```css
background-color: blue;
background-src: url(image.jpg);
background-repeat: no-repeat;
background-scroll: scroll;
background-position: 0px 0px;
```

#### Q12. In the following example, according to cascading and specificity rules, what color will the link be?

```css
.example {
  color: yellow;
}
ul li a {
  color: blue;
}
ul a {
  color: green;
}
a {
  color: red;
}
```

```html
<ul>
  <li><a href="#" class="example">link</a></li>
  <li>list item</li>
  <li>list item</li>
</ul>
```

- [ ] green
- [x] yellow
- [ ] blue
- [ ] red

#### Q13. When elements overlap, they are ordered on the z-axis (i.e., which element covers another). The z-index property can be used to specify the z-order of overlapping elements. Which set of statements about the z-index property are true?

- [x] Larger z-index values appear on top of elements with a lower z-index value. Negative and positive numbers can be used. z-index can only be used on positioned elements.
- [ ] Smaller z-index values appear on top of elements with a larger z-index value. Negative and positive numbers can be used. z-index must also be used with positioned elements.
- [ ] Larger z-index values appear on top of elements with a lower z-index value. Only positive numbers can be used. z-index must also be used with positioned elements.
- [ ] Smaller z-index values appear on top of elements with a larger z-index value. Negative and positive numbers can be used. z-index can be used with or without positioned elements.

#### Q14. What is the difference between the following line-height settings?

```css
line-height: 20px
line-height: 2
```

- [x] The value of 20px will set the line-height to 20px. The value of 2 will set the line-height to twice the size of the corresponding font-size value.
- [ ] The value of 20px will set the line-height to 20px. The value of 2 is not valid.
- [ ] The value of 20px will set the line-height to 20px. The value of 2 will default to a value of 2px.
- [ ] The value of 20px will set the line-height to 20px. The value of 2 will set the line-height to 20% of the corresponding font-size value.

#### Q15. In the following example, what color will paragraph one and paragraph two be? (_Alternative_: In this example, what color will paragraphs one and two be?)

```html
<section>
  <p>paragraph one</p>
</section>

<p>paragraph two</p>
```

```css
section p {
  color: red;
}
section + p {
  color: blue;
}
```

- [ ] Paragraph one will be blue, paragraph two will be red.
- [ ] Both paragraphs will be blue.
- [x] Paragraphs one will be red, paragraph two will be blue.
- [ ] Both paragraphs will be red.

#### Q16.What are three valid ways of adding CSS to an HTML page?

- [ ]

```markdown
1. External; CSS is written in a separate file.
2. Inline; CSS is added to the <head> of the HTML page.
3. Internal; CSS is included within the HTML tags.
```

- [ ]

```markdown
1. External; CSS is written in a separate file and is linked within the <header> element of the HTML file.
2. Inline; CSS is added to the HTML tag.
3. Internal; CSS is included within the <header> element of the HTML file.
```

- [ ]

```markdown
1. External; CSS is written in a separate file and is linked within the <head> element of the HTML file.
2. Internal; CSS is included within the <header> element of the HTML file.
3. Inline; CSS is added to the HTML tag.
```

- [x]

```markdown
1. External; CSS is written in a separate file and is linked within the <head> element of the HTML file .
2. Inline; CSS is added to the HTML tag.
3. Internal; CSS is included within the <head> element of the HTML file.
```

#### Q17. Which of the following is true of the SVG image format? (_Alternative_: Which statement about the SVG image format is true?)

- [ ] CSS can be applied to SVGs but JavaScript cannot be.
- [ ] SVGs work best for creating 3D graphics.
- [x] SVGs can be created as a vector graphic or coded using SVG specific elements such as &#x3C;svg&#x3E;, &#x3C;line&#x3E;, and &#x3C;ellipse&#x3E;.
- [ ] SVGs are a HAML-based markup language for creating vector graphics.

#### Q18. In the example below, when will the color pink be applied to the anchor element?

```css
a:active {
  color: pink;
}
```

- [ ] The color of the link will display as pink after its been clicked or if the mouse is hovering over the link.
- [ ] The color of the link will display as pink on mouse hover.
- [x] The color of the link will display as pink while the link is being clicked but before the mouse click is released.
- [ ] The color of the link will display as pink before it has been clicked.

#### Q19. To change the color of an SVG using CSS, which property is used?

- [ ] Use background-fill to set the color inside the object and stroke or border to set the color of the border.
- [ ] The color cannot be changed with CSS.
- [ ] Use fill or background to set the color inside the object and stroke to set the color of the border.
- [x] Use fill to set the color inside the object and stroke to set the color of the border.

#### Q20. When using position: fixed, what will the element always be positioned relative to?

- [ ] the closest element with position: relative
- [x] the viewport
- [ ] the parent element
- [ ] the wrapper element

#### Q21. By default, a background image will repeat `\_\_\_`

- [ ] only if the background-repeat property is set to repeat
- [x] indefinitely, vertically, and horizontally
- [ ] indefinitely on the horizontal axis only
- [ ] once, on the x and y axis

#### Q22. When using media queries, media types are used to target a device category. Which choice lists current valid media types?

- [ ] print, screen, aural
- [ ] print, screen, television
- [x] print, screen, speech
- [ ] print, speech, device

#### Q23. How would you make the first letter of every paragraph on the page red?

- [x] p::first-letter { color: red; }
- [ ] p:first-letter { color: red; }
- [ ] first-letter::p { color: red; }
- [ ] first-letter:p { color: red; }

#### Q24. In this example, what is the selector, property, and value?

```css
p {
  color: #000000;
}
```

- [ ]

```markdown
"p" is the selector
"#000000" is the property
"color" is the value
```

- [x]

```markdown
"p" is the selector
"color" is the property
"#000000" is the value
```

- [ ]

```markdown
"color" is the selector
"#000000" is the property
"#p" is the value
```

- [ ]

```markdown
"color" is the selector
"p" is the property
"#000000" is the value
```

#### Q25. What is the rem unit based on?

- [ ] The rem unit is relative to the font-size of the p element.
- [ ] You have to set the value for the rem unit by writing a declaration such as rem { font-size: 1 Spx; }
- [ ] The rem unit is relative to the font-size of the containing (parent) element.
- [x] The rem unit is relative to the font-size of the root element of the page.

#### Q26.Which of these would give a block element rounded corners?

- [ ] corner-curve: 10px
- [ ] border-corner: 10px
- [x] border-radius: 10px
- [ ] corner-radius: 10px

#### Q27. In the following media query example, what conditions are being targeted?

```css
@media (min-width: 1024px), screen and (orientation: landscape) { … }
```

- [x] The rule will apply to a device that has either a width of 1024px or wider, or is a screen device in landscape mode.
- [ ] The rule will apply to a device that has a width of 1024px or narrower and is a screen device in landscape mode.
- [ ] The rule will apply to a device that has a width of 1024px or wider and is a screen device in landscape mode.
- [ ] The rule will apply to a device that has a width of 1024px or narrower, or is a screen device in landscape mode.

#### Q28. CSS transform properties are used to change the shape and position of the selected objects. The transform-origin property specifies the location of the element's transformation origin. By default, what is the location of the origin?

- [x] the top left corner of the element
- [ ] the center of the element
- [ ] the top right corner of the element
- [ ] the bottom left of the element

#### Q29. Which of the following is not a valid color value?

- [ ] color: #000
- [ ] color: rgb(0,0,0)
- [ ] color: #000000
- [x] color: 000000

#### Q30. What is the vertical gap between the two elements below?

```html
<div style="margin-bottom: 2rem;">Div 1</div>
<div style="margin-top: 2rem;">Div 2</div>
```

- [x] 2rem
- [ ] 32px
- [ ] 64px
- [ ] 4rem

#### Q31. When using the Flexbox method, what property and value is used to display flex items in a column?

- [x] flex-flow: column; or flex-direction: column
- [ ] flex-flow: column;
- [ ] flex-column: auto;
- [ ] flex-direction: column;

#### Q32. Which type of declaration will take precedence?

- [ ] any declarations in user-agent stylesheets
- [x] important declarations in user stylesheets
- [ ] normal declarations in author stylesheets
- [ ] important declarations in author stylesheets

#### Q33. The flex-direction property is used to specify the direction that flex items are displayed. What are the values used to specify the direction of the items in the following examples?

- [x] Example 1: `flex-direction: row;`
      Example 2: `flex-direction: row-reverse;`
      Example 3: `flex-direction: column;`
      Example 4: `flex-direction: column-reverse;`
- [ ] Example 1: `flex-direction: row-reverse;`
      Example 2: `flex-direction: row;`
      Example 3: `flex-direction: column-reverse;`
      Example 4: `flex-direction: column;`
- [ ] Example 1: `flex-direction: row;`
      Example 2: `flex-direction: row-reverse;`
      Example 3: `flex-direction: column;`
      Example 4: `flex-direction: reverse-column;`
- [ ] Example 1: `flex-direction: column;`
      Example 2: `flex-direction: column-reverse;`
      Example 3: `flex-direction: row;`
      Example 4: `flex-direction: row-reverse;`

#### Q34. There are two sibling combinators that can be used to select elements contained within the same parent element; the general sibling combinator (~) and the adjacent sibling combinator (+). Referring to example below, which elements will the styles be applied to?

```css
h2 ~ p {
  color: blue;
}
h2 + p {
  background: beige;
}
```

```html
<section>
  <p>paragraph 1</p>
  <h2>Heading</h2>
  <p>paragraph 2</p>
  <p>paragraph 3</p>
</section>
```

- [ ] Paragraphs 2 and 3 will be blue. The h2 and paragraph 2 will have a beige background.
- [x] Paragraphs 2, and 3 will be blue, and paragraph 2 will have a beige background.
- [x] Paragraphs 2 and 3 will be blue. Paragraph 2 will have a beige background.
- [ ] Paragraph 2 will be blue. Paragraphs 2 and 3 will have a beige background.

#### Q35. When using flexbox, the "justify-content" property can be used to distribute the space between the flex items along the main axis. Which value should be used to evenly distribute the flex items within the container shown below?

- [x] justify-content: space-around;
- [ ] justify-content: center;
- [ ] justify-content: auto;
- [ ] justify-content: space-between;

#### Q36. There are many advantages to using icon fonts. What is one of those advantages?

- [ ] Icon fonts increase accessibility.
- [ ] Icon fonts can be used to replace custom fonts.
- [x] Icon fonts can be styled with typography related properties such as font-size and color.
- [ ] Icon fonts are also web safe fonts.

#### Q37. What is the difference between `display:none` and `visibility:hidden`?

- [ ] Both will hide the element on the page, but display:none has greater browser support. visibility:hidden is a new property and does not have the best browser support
- [ ] display:none hides the elements but maintains the space it previously occupied. visibility:hidden will hide the element from view and remove it from the normal flow of the document
- [x] display:none hides the element from view and removes it from the normal flow of the document. visibility:hidden will hide the element but maintains the space it previously occupied.
- [ ] There is no difference; both will hide the element on the page

#### Q38. What selector and property would you use to scale an element to be 50% smaller on hover?

- [ ] element:hover {scale: 0.5;}
- [x] element:hover {transform: scale(0.5);}
- [ ] element:hover {scale: 50%;}
- [ ] element:hover {transform: scale(50%);}

#### Q39. Which statement regarding icon fonts is true?

- [ ] Icon fonts can be inserted only using JavaScript.
- [ ] Icon fonts are inserted as inline images.
- [ ] Icon fonts require browser extensions.
- [x] Icon fonts can be styled with typography-related properties such as font-size and color.

#### Q40. The values for the font-weight property can be keywords or numbers. For each numbered value below, what is the associated keyword?

`font-weight: 400; font-weight: 700;`

- [ ] bold; normal
- [x] normal; bold
- [ ] light; normal
- [ ] normal; bolder

#### Q41. If the width of the container is 500 pixels, what would the width of the three columns be in this layout?

`.grid { display: grid; grid-template-columns: 50px 1fr 2fr; }`

- [x] 50px, 150px, 300px
- [ ] 50px, 200px, 300px
- [ ] 50px, 100px, 200px
- [ ] 50px, 50px, 100px

#### Q42. Using the :nth-child pseudo class, what would be the most efficient way to style every third item in a list, no matter how many items are present, starting with item 2?

- [ ]

```css
li:nth-child(3 + 2n) {
  margin: 0 5 px;
}
```

- [x]

```css
li:nth-child(3n + 2) {
  margin: 0 5 px;
}
```

- [ ]

```css
li:nth-child(2),
li:nth-child(5),
li:nth-child(8) {
  margin: 0 5 px;
}
```

- [ ]

```css
li:nth-child(2n + 3) {
  margin: 0 5 px;
}
```

#### Q43. Which selector would select only internal links within the current page?

- [ ] `a[href="#"] {...}`
- [ ] `a[href~="#"]`
- [ ] `a[href^="#"]`
- [x] `a[href="#"]`

#### Q44. What is not true about class selectors?

- [x] Only one class value can be assigned to an element.
- [ ] An element can have multiple class value.
- [ ] Class selectors are marked with a leading period.
- [ ] More than one element can have the same class value.

#### Q45. What is the difference between the margin and padding properties?

- [ ] Margin adds space around and inside of an element; padding adds space only inside of an element.
- [x] Margin adds space around an element; padding adds apace inside of an element.
- [ ] Margin adds a line around an element, padding adds space inside of an element.
- [ ] Margin adds space inside of an element, padding adds space around an element.

#### Q46. What is not a valid way of declaring a padding value of 10 pixels on the top and bottom, and 0 pixels on the left and right?

- [x] padding: 10px 10px 0px 0px;
- [ ] padding: 10px 0px;
- [ ] padding: 10px 0;
- [ ] padding: 10px 0px 10px 0px;

#### Q47. Is there an error in this code? If so, find the best description of the problem

```css
@font-face {
  font-family: 'Avenir', sans-serif;
  src: url('avenir.woff2') format('woff2'), url('avenir.woff') format('woff');
}
```

- [ ] The font file formats are not supported in modern browsers.
- [ ] The src attribute requires a comma between the URL and format values.
- [ ] There are no errors in the example.
- [x] The sans-serif inclusion is problematic.

#### Q48. Which style places an element at a fixed location within its container?

- [x] position: absolute;
- [ ] display: flex;
- [ ] display: block;
- [ ] float: left;

#### Q49. The calc() CSS function is often used for calculating relative values. In the example below, what is the specified margin-left value?

```css
.example {
  margin-left: calc(5% + 5px);
}
```

- [x] The left margin value is equal to 5% of its parents element's width plus 5px
- [ ] The left margin value is equal to 5% of the viewport width plus 5px
- [ ] The left margin value is equal to 5% of the closest positioned element's width plus 5px
- [ ] The left margin value is equal to 5% of the selected element's width (.example) plus 5px

#### Q50. What is the CSS selector for an `<a>` tag containing the title attribute?

- [x] `a[title]`
- [ ] `a > title`
- [ ] `a=title`
- [ ] `a.title`

#### Q51. Which code would you use to absolutely position an element of the logo class?

- [x] `.logo { position: absolute; left: 100px; top: 150px; }`
- [ ] `.logo { position: absolute; margin-left: 100px; margin-top: 150px; }`
- [ ] `.logo { position: absolute; padding-left: 100px; padding-top: 150px; }`
- [ ] `.logo { position: absolute; left-padding: 100px; top-padding: 150px; }`

#### Q52. In this example, what color will Paragraph 1 be?

```css
p:first-of-type {
  color: red;
}
p {
  color: blue;
}
.container {
  color: yellow;
}
p:first-child {
  color: green;
}
```

```html
<div class="container">
  <h1>Heading</h1>
  <p>Paragraph1</p>
  <p>Paragraph2</p>
</div>
```

- [ ] blue
- [ ] green
- [x] red
- [ ] yellow

#### Q53. What is the `::placeholder pseudo-element` used for?

- [x] It is used to format the appearance of placeholder text within a form control.
- [ ] It specifies the default input text for a form control.
- [ ] It writes text content into a hyperlink tooltip.
- [ ] It writes text content into any page element.

#### Q54. Which statement is true of the single colon (`:`) or double colon (`::`) notations for pseudo-elements-for example, `::before` and `:before`?

- [ ] All browsers support single and double colons for new and older pseudo-elements. So you can use either but it is convention to use single colons for consistency.
- [ ] In CSS3, the double colon notation (`::`) was introduced to create a consistency between pseudo-elements from pseudo-classes. For newer browsers, use the double colon notation. For IE8 and below, using single colon notation (`:`).
- [ ] Only the new CSS3 pseudo-elements require the double colon notation while the CSS2 pseudo-elements do not.
- [x] In CSS3, the double colon notation (`::`) was introduced to differentiate pseudo-elements from pseudo-classes. However, modern browsers support both formats. Older browsers such as IE8 and below do not.

#### Q55. Which choice is not valid value for the font-style property?

- [ ] normal
- [ ] italic
- [x] none
- [ ] oblique

#### Q56. When would you use the @font-face method?

- [ ] to set the font size of the text
- [x] to load custom fonts into stylesheet
- [ ] to change the name of the font declared in the font-family
- [ ] to set the color of the text

#### Q57. When elements within a container overlap, the z-index property can be used to indicate how those items are stacked on top of each other. Which set of statements is true?

- [x]

```markdown
1. Larger z-index values appear on top elements with a lower z-index value.
2. Negative and positive number can be used.
3. z-index can be used only on positioned elements.
```

- [ ]

```markdown
1. Smaller z-index values appear on top of elements with a larger z-index value.
2. Negative and positive numbers can be used.
3. z-index can be used with or without positioned elements.
```

- [ ]

```markdown
1. Smaller z-index values appear on top of elements with a larger z-index value.
2. Negative and positive number can be used.
3. z-index must also be used with positioned elements.
```

- [ ]

```markdown
1. Larger z-index values appear on top of elements with a lower z-index value.
2. Only positive number can be used.
3. z-index must also be used with positioned elements.
```

#### Q58. You have a large image that needs to fit into a 400 x 200 pixel area. What should you resize the image to if your users are using Retina displays?

- [ ] 2000 x 1400 pixels
- [ ] 200 x 100 pixels
- [x] 800 x 400 pixels
- [ ] 400 x 200 pixels

#### Q59. In Chrome's Developer Tools view, where are the default styles listed?

- [x] under the User Agent Stylesheet section on the right
- [ ] in the third panel under the Layout tab
- [ ] under the HTML view on the left
- [ ] in the middle panel

#### Q60. While HTML controls document structure, CSS controls **\_**.

- [ ] semantic meaning
- [ ] content meaning
- [ ] document structure
- [x] content appearance

#### Q61. What is the recommended name you should give the folder that holds your project's images?

- [x] images
- [ ] #images
- [ ] Images
- [ ] my images

#### Q62. What is an advantage of using inline CSS?

- [ ] It is easier to manage.
- [x] It is easier to add multiple styles through it.
- [ ] It can be used to quickly test local CSS overrides.
- [ ] It reduces conflict with other CSS definition methods.

#### Q63.Which W3C status code represents a CSS specification that is fully implemented by modern browsers?

- [ ] Proposed Recommendation
- [ ] Working Draft
- [x] Recommendation
- [ ] Candidate Recommendation

#### Q64. Are any of the following declarations invalid?

```css
color: red; /* declaration A */
font-size: 1em; /* declaration B */
padding: 10px 0; /* declaration C */
```

- [ ] Declaration A is invalid.
- [ ] Declaration B is invalid.
- [ ] Declaration C is invalid.
- [x] All declarations are valid.

#### Q65. Which CSS will cause your links to have a solid blue background that changes to semitransparent on hover?

- [x]

```css
a:link {
  background: #0000ff;
}
a:hover {
  background: rgba(0, 0, 255, 0.5);
}
```

- [ ]

```css
a {
  color: blue;
}
a:hover {
  background: white;
}
```

- [ ]

```css
a:link {
  background: blue;
}
a:hover {
  color: rgba(0, 0, 255, 0.5);
}
```

- [ ]

```css
a:hover {
  background: rgba(blue, 50%);
}
a:link {
  background: rgba(blue);
}
```

#### Q66. Which CSS rule takes precedence over the others listed?

- [ ] `div.sidebar {}`
- [ ] `* {}`
- [x] `div#sidebar2 p {}`
- [ ] `.sidebar p {}`

#### Q67. The body of your page includes some HTML sections. How will it look with the following CSS applied?

```css
body {
  background: #ffffff; /* white */
}
section {
  background: #0000ff; /* blue */
  height: 200px;
}
```

- [x] blue sections on a white background
- [ ] Yellow sections on a blue background
- [ ] Green sections on a white background
- [ ] blue sections on a red background

#### Q68. Which CSS keyword can you use to override standard source order and specificity rules?

- [ ] `!elevate!`
- [ ] `*prime`
- [ ] `override`
- [x] `!important`

#### Q69. You can use the **\_** pseudo-class to set a different color on a link if it was clicked on.

- [x] `a:visited`
- [ ] `a:hover`
- [ ] `a:link`
- [ ] `a:focus`

#### Q70. Which color will look the brightest on your screen, assuming the background is white?

- [ ] `background-color: #aaa;`
- [ ] `background-color: #999999;`
- [ ] `background-color: rgba(170,170,170,0.5);`
- [x] `background-color: rgba(170,170,170,0.2);`

#### Q71. Which CSS selector can you use to select all elements on your page associated with the two classes header and clear?

- [ ] `."header clear" {}`
- [ ] `header#clear {}`
- [x] `.header.clear {}`
- [ ] `.header clear {}`

#### Q72. A universal selector is specified using a(n) **\_**.

- [ ] "h1" string
- [ ] "a" character
- [ ] "p" character
- [x] "\*" character

#### Q73. In the following CSS code, `'h1'` is the **\_**, while `'color'` is the **\_**.

```css
h1 {
  color: red;
}
```

- [ ] property; declaration
- [ ] declaration; rule
- [ ] "p" character
- [x] selector; property

#### Q74. What is an alternate way to define the following CSS rule?

```css
font-weight: bold;
```

- [ ] font-weight: 400;
- [ ] font-weight: medium;
- [x] font-weight: 700;
- [ ] font-weight: Black;

#### Q75. You want your styling to be based on a font stack consisting of three fonts. Where should the generic font for your font family be specified?

- [ ] It should be the first one on the list.
- [ ] Generic fonts are discouraged from this list.
- [x] It should be the last one on the list.
- [ ] It should be the second one on the list.

#### Q76. What is one disadvantage of using a web font service?

- [ ] It requires you to host font files on your own server.
- [ ] It uses more of your site's bandwidth.
- [ ] It offers a narrow selection of custom fonts.
- [x] It is not always a free service.

#### Q77. How do you add Google fonts to your project?

- [x] by using an HTML link element referring to a Google-provided CSS
- [ ] by embedding the font file directly into the project's master JavaScript
- [ ] by using a Google-specific CSS syntax that directly links to the desired font file
- [ ] by using a standard font-face CSS definition sourcing a font file on Google's servers

#### Q78. which choice is not a valid color?

- [ ] color: `#000`;
- [ ] color: `rgb(0,0,0)`;
- [ ] color: `#000000`;
- [x] color: `000000`;

#### Q79. Using the following HTML and CSS example, what will equivalent pixel value be for .em and .rem elements?

```
html {font-size: 10px}
body {font-size: 2rem;}
.rem {font-size: 1.5rem;}
.em {font-size: 2em;}

<body>
  <p class="rem"></p>
  <p class="em"></p>
</body>

```

- [ ] The .rem will be equivalent to 25px; the .em value will be 20px.
- [ ] The .rem will be equivalent to 15px; the .em value will be 20px.
- [ ] The .rem will be equivalent to 15px; the .em value will be 40px.
- [ ] The .rem will be equivalent to 20px; the .em value will be 40px.

#### Q80. In this example, according to cascading and specificity rules, what color will the link be?

```
.example {color: yellow;}
ul li a {color: blue;}
ul a {color: green;}
a {color: red;}

<ul>
  <li><a href="#" class="example">link</a></li>
  <li>list item</li>
  <li>list item</li>
</ul>

```

- [ ] blue
- [ ] red
- [x] yellow
- [ ] green

#### Q81. What property is used to adjust the space between text characters?

- [ ] `font-style`
- [ ] `text-transform`
- [ ] `font-variant`
- [x] `letter-spacing`

 #### Q82. What is the correct syntax for changing the curse from an arrow to a pointing hand when it interacts with a named element?

- [x] `.element {cursor: pointer;}`
- [ ] `.element {cursor: hand;}`
- [ ] `.element {cursor: move-hand;}`
- [ ] `.element {cursor: pointer-hand;}`