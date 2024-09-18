![diagram-export-19_09_2023, 21_21_18.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/18590c1d-8cdf-4e8a-a3e1-4121577eed4e/68c78c32-af80-4586-abee-d60dc9e67a30/diagram-export-19_09_2023_21_21_18.png)

Test-Driven Development (TDD) is a revolutionary approach to software development that can transform your coding workflow, boost productivity, and enhance code quality. In this lesson, we’ll dive deep into TDD's core principles and demonstrate its power by building a registration endpoint using Express.js and TypeScript.

## The Power of TDD 🔍

**Why is TDD so impactful?**

1. **Quality Assurance**: With TDD, you’re always one step ahead of bugs. It ensures the code functions exactly as you intend.
2. **Documentation**: Your tests provide a clear understanding of what each function or feature does.
3. **Flexibility**: Refactoring becomes a breeze! Want to make changes? No problem! Your tests ensure everything still works.
4. **Confidence**: No more second-guessing. With solid tests, you know your code is dependable.

## Let's Dive In! 🌊

![diagram-export-19_09_2023, 21_22_52.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/18590c1d-8cdf-4e8a-a3e1-4121577eed4e/04968585-a4c9-462a-85c7-049e77fa2787/diagram-export-19_09_2023_21_22_52.png)

### Rinse and Repeat 🔄

TDD is cyclic. You’ll:

1. Write a test.
2. Implement code.
3. Refactor if needed.
4. Go back to writing the next test.

As you expand the registration endpoint, think about validation, password hashing, error handling, etc. Each new feature or logic should start with a test.

## Wrapping Up 🎁

TDD might seem counterintuitive at first. Why write tests for code that doesn't exist yet? But as you've seen, it offers clear direction, ensures robustness, and ultimately leads to superior code quality.

Happy testing! 🎉

Notes:-

1. Folder Struture
   Entity wise (every has its owns related file including the test file)
   Separate Test folder (It include all entity as sub folder, also easy to exclude from compiling)
   register.spec.ts or register.test.ts

2. Data Driven Development
   DB Schema > code to match the schema
   Test Driven Development
   Test First > Code to pass the test

3. describe()
   To group the test or the sub group the test
   happy path - all fields are available
   sad path - fields are missing
   describe.skip() to skip the path

4. AAA
   Arrange - Arrage the required data
   Act - trigger the test
   Assert - Check the test
