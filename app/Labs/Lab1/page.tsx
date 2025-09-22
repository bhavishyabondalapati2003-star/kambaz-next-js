"use client";

import Image from "next/image";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      {/* Heading exercise */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and subsections.
        Each section is usually prefaced with a short title or heading...
      </div>

      {/* Paragraph exercise */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. We often separate a long set of sentences with
          vertical spaces to make the text easier to read.
        </p>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>

      {/* Lists exercise */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        My favorite recipe:
        <ol id="wd-your-favorite-recipe">
          <li>Step 1 of your recipe</li>
          <li>Step 2 of your recipe</li>
          <li>Step 3 of your recipe</li>
        </ol>
      </div>

      {/* Unordered Lists exercise */}
      <div id="wd-unordered-lists">
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order):
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender&apos;s Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>

        Your favorite books (in no particular order):
        <ul id="wd-your-books">
          <li>Book 1</li>
          <li>Book 2</li>
          <li>Book 3</li>
        </ul>
      </div>

      {/* Table exercise */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} id="wd-simple-table">
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Revenue</th>
              <th>Cost</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>$10,000</td>
              <td>$8,000</td>
              <td>$2,000</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>$15,000</td>
              <td>$10,000</td>
              <td>$5,000</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>$20,000</td>
              <td>$15,000</td>
              <td>$5,000</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>$25,000</td>
              <td>$20,000</td>
              <td>$5,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Images exercise */}
      <div id="wd-images">
        <h4>Image Tag</h4>
        <h5>Remote Image</h5>
        <Image
          id="wd-starship"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          width={400}
          height={250}
          alt="SpaceX Starship prototype"
        />

        <h5>Local Image</h5>
        <Image
          id="wd-teslabot"
          src="/images/teslabot.jpg"
          width={200}
          height={200}
          alt="Tesla humanoid robot"
        />
      </div>

      {/* Forms exercise */}
      <div id="wd-forms">
        <h4>Form Elements</h4>

        {/* Text input */}
        <p>Text Input:</p>
        <input type="text" placeholder="Enter your name" />

        {/* Password input */}
        <p>Password Input:</p>
        <input type="password" placeholder="Enter your password" />

        {/* Textarea */}
        <p>Textarea:</p>
        <textarea rows={4} cols={40} placeholder="Write something here..." />

        {/* Button */}
        <p>Button:</p>
        <button onClick={() => alert("Button clicked!")}>Click Me</button>

        {/* Radio buttons */}
        <p>Radio Buttons (choose one):</p>
        <input type="radio" name="color" value="red" /> Red
        <input type="radio" name="color" value="blue" /> Blue
        <input type="radio" name="color" value="green" /> Green

        {/* Checkboxes */}
        <p>Checkboxes (choose many):</p>
        <input type="checkbox" value="apple" /> Apple
        <input type="checkbox" value="banana" /> Banana
        <input type="checkbox" value="cherry" /> Cherry

        {/* Dropdowns */}
        <p>Dropdown:</p>
        <select defaultValue="volvo">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        {/* Dropdowns exercise */}
        <h4>Dropdowns</h4>
        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br />
        <select id="wd-select-one-genre" defaultValue="SCIFI">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br />
        <select id="wd-select-many-genre" multiple defaultValue={["COMEDY", "SCIFI"]}>
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        {/* Other HTML field types */}
        <h4>Other HTML field types</h4>
        <label htmlFor="wd-text-fields-email">Email:</label>
        <input type="email" placeholder="jdoe@somewhere.com" id="wd-text-fields-email" /><br />

        <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
        <input type="number" defaultValue={100000} placeholder="1000" id="wd-text-fields-salary-start" /><br />

        <label htmlFor="wd-text-fields-rating">Rating:</label>
        <input type="range" defaultValue={4} max={5} id="wd-text-fields-rating" /><br />

        <label htmlFor="wd-text-fields-dob">Date of birth:</label>
        <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob" /><br />

        {/* Anchor tags */}
        <h4>Anchor tag</h4>
        Please <a href="https://www.lipsum.com" id="wd-lipsum">click here</a> to get dummy text.<br />
        <a href="https://github.com/YOUR_USERNAME/YOUR_REPO" id="wd-github">GitHub Repo</a>
      </div>
    </div>
  );
}
