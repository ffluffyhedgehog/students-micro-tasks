# Lab 1
Welcome to real life. The team you're working with has inherited a massive and tangled codebase, originally written by a cheap subcontractor, amidst constantly evolving requirements and their increasing complexity. You get what you pay for, and the application's codebase is now a horrifying Lovecraftian nightmare, riddled with an incredible number of bugs and a complete lack of sense and structure. The contract with the previous subcontractor has been terminated because they couldn't implement even the simplest features.

Now, it's your problem because the business needs those features.

After attempting to fix things and maybe even create something new, you've come to understand why the previous subcontractor couldn't do anything. Fix one bug, and ten more pop up. Implementing new features is an incredibly painstaking and intensive process, navigating through this mess and making changes without breaking everything is extremely challenging.

Your leader turned out to be a very convincing negotiator, and you managed to convince the business to allocate time and resources for gradual codebase improvements.

Thus, you've been handed the `updateAction` function, located in `state-manager.js`. It's called in many parts of the project whenever settings for certain types of entities need to be changed.

Since it's taken out of context, I've documented the data types it accepts for you. Unfortunately, in the _real_ real world, it's usually much worse, but in this case, you're lucky.

Enjoy the pain and suffering.

<sub>The function and the data it operates on are a product of imagination inspired by observations of real projects and code found in them. Any resemblance to real projects is purely coincidental.</sub>
## Goals
- Refactor the function

## Task
- Analyze the function
- Identify anti-patterns and areas for improvement
- Write tests for it to fix its behaviour and be able to reproduce it with much cleaner code
- Refactor the function to make it more concise, readable and understandable. Split if necessary.
- Keep the function argument list. The function is widely called, and you do not want to face implications of changing its contract. Though feel free to rename it to better mirror what it's doing after the refactor.
- Use the tests to make sure the new function behaves like the original.
## Questions
- 
## What to read
- Anything on DRY
- https://sourcemaking.com/refactoring/smells
- Single responsibility principle, separation of concerns
- https://eloquentjavascript.net/05_higher_order.html
