const error = {
	message: {
		linkIsRequired: "لطفا یک پیوند جهت دانلود تعیین نمایید.",
		mediaTypeIsRequired: "لطفا نوع رسانه را تعیین نمایید.",
		pathIsRequired: "لطفا مسیر ذخیره سازی را تعیین نمایید.",
		socialNetworkIsRequired: "لطفا شبکه اجتماعی مورد نظر را تعیین نمایید.",
		fileNameIsRequired: "نام فایل را جهت ذخیره سازی تعیین نمایید.",
		invalidLink: "لطفا پیوند صحیحی وارد نمایید.",
		invalidMediaType: "نوع رسانه صحیح نمی باشد. [image, video]",
		invalidSocialNetwork:
			"شبکه اجتماعی وارد شده، صحیح نمی باشد. [twitter, instagram, telegram]",
		downloadFailed: "خطا در عملیات بارگیری.",
		invalidExtension: "پیوند ارسال شده شامل فرمت های پیشفرض نمی باشد.",
		ftpUploadFailed: "بارگزاری در هاست دانلودی با خطا مواجه شد.",
		convertImageToBase64Failed: "خطا در تبدیل عکس به رمز",
		usernameIsRequired: "لطفا نام کاربری را وارد نمایید.",
		passwordIsRequired: "لطفا رمز عبور را وارد نمایید.",
		userPassError: "نام کاریری یا رمز عبور صحیح نمی‌باشد.",
		usernameExistError: "کاربری با این نام قبلا ثبت نام نموده است.",
		loginFailed: "خطا در عملیات ورورد",
		signUpFailed: "خطا در عملیات ثبت نام",
		assignTokenUpFailed: "خطا در انتصاب توکن",
		forbiddenRequest: "ممنوع بودن درخواست",
		saveFileError: "خطا در ذخیره سازی محلی فایل",
		conversionError: "خطا در تبدیل فرمت",
	},
	code: {
		dataErrorCode: 400,
		notFoundErrorCode: 404,
		forbidden: 403,
		serverErrorCode: 500,
	},
};

const success = {
	message: {
		downloadedSuccessfully: "عملیات دانلود با موفقیت انجام شد.",
		ftpUploadedSuccessfully:
			"بارگزاری فایل در هاست دانلودی با موفقیت انجام شد.",
		convertedImageToBase64Successfully: "موفقیت در تبدیل عکس به رمز",
		loggedInSuccessfully: "عملیات ورود با موفقیت انجام شد.",
		signedUpSuccessfully: "عملیات ثبت نام با موفقیت انجام شد.",
		convertedSuccessfully: "عملیات تبدیل فرمت با موفقیت انجام شد.",
	},
	code: {
		successCode: 200,
	},
};

module.exports = {
	error,
	success,
};
