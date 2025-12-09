The Task Manager is a simple  web application designed to help users create, organize, and manage their daily tasks. It provides features such as adding tasks, filtering, searching, sorting, marking tasks as complete, and permanently deleting them.
All tasks are saved in the browser using LocalStorage, ensuring that user information remains even after refreshing or closing the browser.


Langauges use	Purpose
HTML5	Structure and layout of the interface 
CSS	Styling, theme colors, responsiveness, shadows & layout 
JavaScript 	Data handling, UI rendering, LocalStorage, event listeners 
System Overview
The application is organized into three main sections:
a) Add Task Section
Allows the user to:
    • Enter a task name (words only no numbers)
    • Optionally choose a due date
    • Select a category (Work, School, Personal this is manditory)
    • Add or clear the form
b) Controls Section
This section provides tools for organizing tasks:
    • Search bar(to search for task if the list task section is full)
    • Filter by category (Work, School, Personal )
    • Sort by:
        ◦ Created date
        ◦ Task name (A–Z)
        ◦ Due date
    • Task counters (total  avalible and completed)
c) Task List Section
Displays all tasks rendered dynamically using JavaScript.
Each task shows:
    • Checkbox for marking complete
    • Category and date
    • Buttons: Complete / Uncomplete and Delete
  Javascript functions 
1.LocalStorage Functions
s a built-in browser storage that allows a website to save data directly on the user’s device.
Anything saved in LocalStorage remains even after the page is refreshed or the browser is closed.
2. saveTasks()
Stores the tasks[] array into the browser’s LocalStorage in JSON format.
 3. loadTasks()
Loads saved tasks from LocalStorage into the app when it starts.
 Rendering & Core Logic
4. render()
This is the most important function. It:
    • Applies search filters
    • Applies category filters
    • Sorts tasks
    • Clears and re-renders the task list
    • Updates counters
    • Displays empty state if no tasks exist
This function is called after every update to ensure the UI is always correct.
