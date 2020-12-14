# Project Documentation
The application is structured according to the course materials. It is only run locally (see the section
"guidelines for running the application"). It has been manually tested to work properly, and I sincerely 
hope it works for the esteemed reader as well.

The project should have all but six requirements implemented, as far as I understand them. The ones missing 
are the automated tests, deployment online and cross-origin requests. See remaining_requirements.md 
for the exact list of requirements I did not complete.

## Necessary CREATE TABLE statements needed to create the database used by the application
- Database commands are provided in the database_commands.md file (/documentation/database_commands.md)
- They were run in order using ElephantSQL browser
- There are two databases:
    - users: contains the user emails and passwords
    - reports: contains all the reports. 
        - Morning and evening reports are distinguished by a boolean value

## Guidelines for running the application
- In these instructions, I presume the user knows how to create a PostgreSQL database 
- Create the database in a location of your choosing (e.g. ElephantSQL), and run the database creation
commands in order. They are contained in "/documents/database_commands.md".
- The connection pool uses environment variables, so you need to set them according to the 
credentials of the database you just created:
    - PGHOST        (hostname)
    - PGDATABASE    (name)
    - PGUSER        (user - usually same as database name)
    - PGPASSWORD    (password)
    - PGPORT        (port - usually 5432)
    - I set these with Powershell, with commands of type: PS C:\> $env:VAR_NAME="VALUE", but you may use whichever
    method you want
- the command to run the application after setting environment variables and navigating to the root folder:
>deno run --allow-net --allow-env --allow-read --unstable app.js
- now you should be able to access the application at:
>http://localhost:7777/
- note: The summary section of the application features input types "week" and "month", which do not seem to work 
on Mozilla Firefox, so they have to be used by another browser. I tested them to work with MS Edge.

## Guidelines for running tests
There are unfortunately no automated tests in the application. All testing was done manually. There are some test
folders, but the files are not implemented.

## The address at which the application can currently be accessed
The application is not deployed online; it must be run locally.


That should cover all the necessary documentation. I hope you have a fun and bug-free time!