# That's what you will have to do

## Some notes

`react-day-picker` is not up-to-date on the npm, so we have to use a git version of it because npm version has typings errors.

## Run an example

That's fairly simple.

```sh
  yarn
  yarn dev
```

## Make it workspace ready

For starters: https://classic.yarnpkg.com/en/docs/workspaces/

You should refactor the project and make this scary structure look like this:

```
  /frontend
    /site
      /app – containing NextJS entrypoint and pages
      /date-picker
      /auth
    /ui
      -- <...ui components however you name them>
```

## Fix minor bugs

Fix `pages/_app.tsx:4`

## Fix date picker

There's an input and there's also a dropdown with a date picker. That's how it supposed to go:

1. User clicks on the input
2. Date picker pops up
3. User may select date, and if he does, picker disappears and UI focuses onto the next date input.

The problem is that you can't select the day: when you do, datepicker disappears and input doesn't change.

Rules:

1. It oughta work in the latest version of Safari and Chrome
2. You can't use React classes (neither `DayPickerInput`) and **can only use React hooks and `DayPicker`**

Honestly, took me a while to figure that one out.
