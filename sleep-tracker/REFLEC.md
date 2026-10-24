# Assignment 2: State and Dynamic Data

## Reflection Prompt

Include a short reflection addressing the following questions.  
> **All reflection questions must be answered** to be eligible for full marks.
> 
> Each response should be approximately **2 to 4 sentences** and should reference specific parts of your project where appropriate.
> 
> **Honest reflections** about challenges, mistakes, or confusion are encouraged and **will not negatively impact your grade**.

 - Describe how your application fetches sleep data from the backend. Identify the screen and the hook or function where the fetch logic is implemented.

I used the fetch() function inside useEffect() to retrieve sleep entries from the provided backend API. The fetch logic is implemented in sleep.list.tsx and sleep-statistics.tsx, where each screen loads data independently when it mounts. I used useState() to store the fetched data and manage loading and error messages.

 - Explain how you handled form validation on the **Sleep Log Entry** screen. Which component or file contains the validation logic and how does the user receive feedback when the form is submitted?

In sleep-entry.tsx, I used useState() to manage the date, bedtime, wake time, and sleep quality inputs. I created validation functions to check the date format and ensure the time values follow the 24-hour format. When users enter invalid values, the fields display red borders and error messages, while valid fields show green borders and checkmarks. After a successful submission, the application displays a confirmation message and resets the form.

 - Describe how sleep entries are rendered dynamically in either the **Sleep Log List** screen or the **Sleep Statistics** screen. Which state variables and components are involved?

In sleep-list.tsx, I used the entries state variable to store the sleep records retrieved from the backend. I used FlatList and the reusable SleepEntryCard component to display each record, including the date, bedtime, waketime, and sleep quality. When the fetched data is stored in state using setEntries(), React automatically updates the displayed list.

 - Describe one challenge you encountered while implementing state management, data fetching, or statistics calculations. Explain how you resolved the issue.
One challenge I encountered was a navigation error caused by registering the same twice in _layout.tsx. Expo Router displayed an error because screen names must be unique, which prevented the application from running correctly. I corrected the screen registrations, ensured each route had a unique name, and update the Home screen navigation paths.

 - Choose one commit from your Git history that represents meaningful progress in this assignment. Include the commit message and explain what was implemented in that commit.

This commits includes the Sleep Log List screen to fetch sleep records from the backed instead of displaying hardcoded values. I used React state to manage the fetched entries, loading status and errors, and implemented calculations for average sleep quality, bedtime, wake time, sleep duration and total entries. The statistics are displayed dynamically using the existing reusable StatCard component.
