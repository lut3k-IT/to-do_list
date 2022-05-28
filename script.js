'use strict';

// ## Funkcjonalność
// Aplikacja wyświetla listę zadań do wykonania. Zadania podzielone są na *wykonane* oraz *do zrobienia*.
//   - Zadania *wykonane* są przekreślone i są oznaczone kolorem (`#9eb2c0`) i zaznaczonym polem wyboru po lewej stronie.
//   - Zadania *do zrobienia* są oznaczone kolorem (`#2e3641`) i niezaznaczonym polem wyboru po lewej stronie.
//   - Pod listą zadań zawsze wyświetla się pole z możliwością dodania nowego zadania. Nowe zadanie jest zawsze *do zrobienia*
//   - Po dodaniu nowego zadania, dodawane jest ono nad polem dodawana nowego zadania. Pole z możliwością dodania nowego zadania jest zawsze na samym dole listy.
//   - Nie można dodać zadania bez wpisania tytułu (trzeba dodać wizualną walidację).
//   - Każde zadanie można usunąć poprzez kliknięcie w ikonę kosza.
//   - W prawym górnym rogu dodajmy przycisk, który pozwola usunąć wszystkie taski.
//   - **Uwaga!** Aktualny stan listy zapisany jest w <u>LocalStorage</u>.
//   - Jeśli mamy zapisaną w LocalStorage liste, powinna się ona pojawić od razu po załadowaniu skryptu