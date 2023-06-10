function authorize(ctx, next) {
  const userId = ctx.from.id;

  // Check if the user is authorized
  if (authorizedUsers.includes(userId)) {
    return next(); // User is authorized, proceed to the next middleware or handler
  } else {
    // User is not authorized, send an error message
    return ctx.reply("You are not authorized to perform this action.");
  }
}
