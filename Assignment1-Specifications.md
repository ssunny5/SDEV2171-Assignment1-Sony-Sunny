# Assignment 1: Mobile App Setup and Core UI Specifications

## Overview

In this assignment, you will create a **new React Native mobile application from scratch using Expo** and build a UI prototype for a **sleep tracker application**.

This app will serve as the foundation for all remaining assignments in this course. In later assignments, you will incrementally extend this same application by adding state management, authentication, web services, and device hardware features.

For this assignment, your focus is strictly on:
- Environment setup
- Project creation
- Core UI structure
- Screen layout and navigation

No tracking logic or real data persistence is required yet.

## Scope and Boundaries

This assignment assesses content from:
- **Module 1: Foundations and Setup**
- **Module 2: Core UI and Navigation**

This assignment represents a **UI prototype only**.

Do **not** include:
- Local or global state management
- Authentication or user accounts
- API or remote data fetching
- Persistent storage
- Device hardware features (camera, GPS, sensors)
- Third-party UI frameworks or component libraries

> **NOTE:** Using concepts, libraries, or patterns not yet covered in the course may result in loss of marks.

## Learning Outcomes Assessed

This assignment assesses the following course outcomes:
- **CO1:** Set up and use mobile application development tools and APIs
- **CO2:** Write and evaluate mobile application code

## Starter Files

There are **no starter files provided** for this assignment.

You are responsible for:
- Creating a new Expo project
- Organizing your project structure
- Adding files and folders as needed

Future assignments will build on this same project, and starter files may be provided at that time.

## Development Setup

You must create your project using Expo. The following command was demonstrated in class and can be used to create the project:

```sh
npx create-expo-app@latest sleep-tracker
```

After creating the project, follow the Expo setup documentation for your operating system:

https://docs.expo.dev/get-started/introduction/

To run the application on Android, you will need:

- Android Studio installed
- An Android Virtual Device (AVD) configured
- A compatible Java JDK installed (JDK 21 recommended)

Once your environment is configured, you can run your app using:

```sh
npx expo run:android
```

You may also run the application using a physical device if preferred.

## What You'll Build

You will build a **UI prototype for a sleep tracker mobile application**. Each page has strict requirements that must be met (see below). You are free to update and style the page as you see fit (e.g., layout, colours, fonts, etc.) so long as the main requirements are developed. The layout should demonstrate the use of reusable components where applicable.

You may wish to conduct some UI research on common sleep-tracking apps. [Dribbble](https://dribbble.com/search/sleep%20tracker%20app) is a great resource for generating ideas.

Your application must include the following screens:

### Home Screen
Must contain distinct navigation links to both the **Sleep Log Entry** screen and the **Sleep Statistics** screen.

- If you keep the default tab navigation provided by Expo, the tabs themselves **do not count** as these required links. The Home screen must provide its own clear navigation to the other screens (for example, buttons or links).

- Also, if you choose to keep the default tab navigation created by `create-expo-app`, you must update the tab configuration so that the tabs correctly navigate to your **Sleep Log Entry** and **Sleep Statistics** screens. The original scaffold pages (for example `explore.tsx`) should be renamed or replaced so that the tab labels and routes match the required screens for this assignment.

Consider what information is most important for a user when they open the app and view the home screen.

At a minimum, the following must be included:
- App title
- Brief description of the app's purpose or tagline
- Navigation options to other screens

### Sleep Log Entry Screen
The UI should allow the user to enter the following information:

- The date (default to the previous night)
- Time to bed
- Time awake
- Quality of sleep (for example: rating, category, or simple selection)

The data does **not** need to be stored or processed for this assignment. Inputs may simply exist as UI elements and may remain static.

### Sleep Statistics Screen
The stats page must present a **grid-style layout** displaying available sleep statistics. These statistics may be static placeholder values for this assignment (e.g., empty boxes with labels will suffice).

At a minimum, include:
- Last seven days sleep duration
- Last seven days' average quality
- Last seven days' average time to bed
- Last seven days' average wake time

Additional stats may be included, if you like.

The goal is not to record or analyze sleep yet, but to design the structure and navigation of an app that *will* support that functionality later in the course.

## Functional Requirements

Your application must meet the following requirements:

- You must create a **new Expo project from scratch**.
- The app must run successfully on:
  - An emulator **or**
  - A physical mobile device.
- The app must include **at least three screens**: Home, Sleep Log Entry, and Sleep Statistics.
- Navigation between screens must be implemented using a navigation approach demonstrated in class.
- Screens must use **reusable UI components** rather than duplicated code where applicable.
- All data may be static (hard-coded).
- Text, layout, and spacing must be styled for clarity and usability.
- The app must run without runtime errors.

## Implementation Expectations

This assignment is evaluated by running your app and verifying that the required screens are reachable and meet the UI requirements.

### Expected screens and navigation

Your app must include the following screens:

- Home
- Sleep Log Entry
- Sleep Statistics

From the **Home screen**, a user must be able to navigate to:
- Sleep Log Entry
- Sleep Statistics

If you keep the default Expo Router tab scaffold, you must update it so the tabs point to your required screens (the original scaffold page such as `explore.tsx` should be renamed or replaced).

### Data and behaviour expectations

To stay within scope for Assignment 1:

- Entry inputs do not need to save or validate data.
- Statistics may be placeholder values and do not need to be calculated.
- No persistent storage, no APIs, and no authentication.

### Optional UI controls

You may use additional UI controls demonstrated in class, but they are optional.
Examples:
- Date or time pickers (optional)
- Ratings or simple selection controls (optional)

If you include optional controls, the UI still does not need to store or process the data.

## Technical Constraints

- You must use **React Native with Expo**.
- You must create the project yourself using Expo tooling.
- Only tools, libraries, and patterns demonstrated in Modules 1 and 2 are permitted.
- Styling must be done using React Native styling techniques shown in class.
- Do not introduce:
  - Local or global state management libraries
  - External UI component libraries
  - Custom native modules

## Validation and Self-Checking

Before submitting, confirm:

- The app runs successfully on an emulator or a physical device
- The Home screen includes explicit navigation to Entry and Stats
- All three required screens render without runtime errors
- The Stats screen uses a grid-style layout (placeholders are fine)
- The Entry screen includes inputs for date, time to bed, time awake, and sleep quality
- Tabs are updated if you kept the scaffold tabs

You may be asked to demonstrate and explain your app running during review.

## Evaluation Criteria

**Important:** You must demonstrate incremental development by committing regularly throughout the assignment period. Commits should show meaningful progress. Lack of incremental commits may result in loss of marks.

If you use external resources beyond what was demonstrated in class, you must document them. You may be asked to explain how your code works. **Inability to explain submitted code may be treated as potential academic misconduct.**

| Category | Marks | Description |
|--------|------|-------------|
| Environment Setup | 5 | App builds and runs correctly |
| Navigation | 5 | All required screens accessible |
| Functional UI Requirements | 5 | Entry form and stats grid implemented |
| Code Organization | 1 | Components, naming, and structure |
| Reflection | 4 | CWritten reflection demonstrates understanding |

> Navigation will be evaluated by running the app and verifying that all required screens can be accessed through the user interface.
>
> All reflection questions must be answered to be eligible for full marks.

## Tips for Success

- Create and run your Expo project as early as possible to avoid setup issues.
- Start early so you can resolve setup issues calmly.
- Commit small, logical changes as you work.
- Build one screen at a time and test frequently.
- Keep components small and focused.
- Follow patterns demonstrated in class closely.

## Submission Checklist

Before submitting, confirm that:
- The app runs without errors
- Navigation works correctly
- Commits show incremental progress
- The README reflection is complete

## Reflection Prompt

In the README.md, complete the reflection prompt at the end of the file.