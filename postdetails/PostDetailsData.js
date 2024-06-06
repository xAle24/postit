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
        heartNumber,
        starryEyesNumber,
        moaiNumber
    )
    {
        this.thumbsUpNumber = thumbsUpNumber
        this.thumbsDownNumber = thumbsDownNumber
        this.heartNumber = heartNumber
        this.starryEyesNumber = starryEyesNumber
        this.moaiNumber = moaiNumber
    }

    getThumbsUpNumber() {
        return this.thumbsUpNumber
    }
    getThumbsDownNumber() {
        return this.thumbsDownNumber
    }
    getHeartNumber() {
        return this.heartNumber
    }
    getStarryEyesNumber() {
        return this.starryEyesNumber
    }
    getMoaiNumber() {
        return this.moaiNumber
    }
}

class PostComment {
    constructor(
        authorName,
        authorSurname,
        authorPicturePath,
        commentContent,
        commentTimestamp
    ) {
        this.authorName = authorName
        this.authorSurname = authorSurname
        this.authorPicturePath = authorPicturePath
        this.commentContent = commentContent
        this.commentTimestamp = commentTimestamp
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

    getCommentTimestamp() {
        return this.commentTimestamp
    }
}