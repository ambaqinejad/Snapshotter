const error = {
    message: {
        linkIsRequired: "لطفا یک پیوند جهت دانلود تعیین نمایید.",
        mediaTypeIsRequired: "لطفا نوع رسانه را تعیین نمایید.",
        pathIsRequired: "لطفا مسیر ذخیره سازی را تعیین نمایید.",
        socialNetworkIsRequired: "لطفا شبکه اجتماعی مورد نظر را تعیین نمایید.",
        fileNameIsRequired: "نام فایل را جهت ذخیره سازی تعیین نمایید.",
        invalidLink: "لطفا پیوند صحیحی وارد نمایید.",
        invalidMediaType: "نوع رسانه صحیح نمی باشد. [image, video]",
        invalidSocialNetwork: "شبکه اجتماعی وارد شده، صحیح نمی باشد. [twitter, instagram, telegram]"
    },
    code: {
        dataErrorCode: 400,
    }
}

module.exports = {
    error
}