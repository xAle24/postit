const commentHTMLtemplate = `
<li class="commentListItem">
    <div class="comment">
        <div class="avatarContainer">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar">
        </div>
        <div class="commentTextContainer">
            <h3 class="commentAuthor">Mario Rossi</h3>
            <p class="commentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, nunc nec ultricies.</p>
        </div>
    </div>
</li>
`

const availabilityTemplate =
`
<div class="availability">
    <div class="availabilityDateAndPeople">
        <p class="availabilityParagraph">Giovedì 4 Maggio 2028, 14:00 - 16:00</p>
        <p class="availablePeopleParagraph">Tu e altre 15 persone disponibili</p>
    </div>
    <div class="availabilityCheckbox">
        <label class="availabilityCheckboxLabel" id="availabilityCheckboxLabel1" for="availabilityCheckbox"></label>
        <input type="checkbox" id="availabilityCheckbox" name="availabilityCheckbox1" onchange="onCheckboxClick.call(this)">
    </div>
</div>
`