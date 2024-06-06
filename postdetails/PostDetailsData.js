/**
 * A class that contains all the data FETCHED from the database.
 * These objects are readonly, and are not used to update
 * the database.
 */
class PostDetailsData {
    constructor(
        postTitle,
        authorPicturePath,
        authorName,
        authorSurname,
        reactionCounts,
        availability,
        postComments
    ) {
        this.postTitle = postTitle
        this.authorPicturePath = authorPicturePath
        this.authorName = authorName
        this.authorSurname = authorSurname
        this.reactionCounts = reactionCounts
        this.availability = availability
        this.postComments = postComments
    }

    getPostTitle() {
        return this.postTitle
    }

    getAuthorPicturePath() {
        return this.authorPicturePath
    }

    getAuthorName() {
        return this.authorName
    }

    getAuthorSurname() {
        return this.authorSurname
    }

    getReactionCounts() {
        return this.reactionCounts
    }

    getAvailability() {
        return this.availability
    }

    getPostComments() {
        return this.postComments
    }
}

class ReactionCounts {
    constructor(
        thumbsUpNumber,
        thumbsDownNumber,
        starryEyesNumber,
        heartNumber,
        moaiNumber
    )
    {
        this._thumbsUpNumber = thumbsUpNumber
        this._thumbsDownNumber = thumbsDownNumber
        this._starryEyesNumber = starryEyesNumber
        this._heartNumber = heartNumber
        this._moaiNumber = moaiNumber
    }

    getThumbsUpNumber() {
        return this._thumbsUpNumber
    }
    getThumbsDownNumber() {
        return this._thumbsDownNumber
    }
    getHeartNumber() {
        return this._heartNumber
    }
    getStarryEyesNumber() {
        return this._starryEyesNumber
    }
    getMoaiNumber() {
        return this._moaiNumber
    }
}

class PostComment {
    constructor(
        authorName,
        authorSurname,
        authorPicturePath,
        commentContent
    ) {
        this.authorName = authorName
        this.authorSurname = authorSurname
        this.authorPicturePath = authorPicturePath
        this.commentContent = commentContent
    }

    getAuthorName() {
        return this.authorName
    }

    getAuthorSurname() {
        return this.authorSurname
    }

    getAuthorPicturePath() {
        return this.authorPicturePath
    }

    getCommentContent() {
        return this.commentContent
    }
}

class Availability {
    constructor(
        availabilityDate,
        startTime,
        endTime
    ) {
        this.availabilityDate = availabilityDate
        this.startTime = startTime
        this.endTime = endTime
    }

    getAvailabilityDate() {
        return this.availabilityDate
    }

    getStartTime() {
        return this.startTime
    }

    getEndTime() {
        return this.endTime
    }
}