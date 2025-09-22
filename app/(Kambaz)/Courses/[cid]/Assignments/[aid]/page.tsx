"use client";

import React from "react";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      {/* Description */}
      <label htmlFor="wd-description">Description</label>
      <textarea id="wd-description">
        The assignment is available online. Submit a link to the landing page of your work.
      </textarea>
      <br /><br />

      {/* Points */}
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* Group */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Group</label>
            </td>
            <td>
              <input type="checkbox" id="wd-group" />
            </td>
          </tr>

          {/* Display Grade As */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Points">
                <option value="Points">Points</option>
                <option value="Percentage">Percentage</option>
              </select>
            </td>
          </tr>

          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online Text">
                <option value="Online Text">Online Text</option>
                <option value="File Upload">File Upload</option>
                <option value="Website URL">Website URL</option>
                <option value="Media Recordings">Media Recordings</option>
              </select>
            </td>
          </tr>

          {/* Text Entry */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-text-entry">Text Entry</label>
            </td>
            <td>
              <textarea id="wd-text-entry" placeholder="Enter instructions here" />
            </td>
          </tr>

          {/* Other Fields */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-website-url">Website URL</label>
            </td>
            <td>
              <input type="url" id="wd-website-url" placeholder="https://example.com" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </td>
            <td>
              <input type="file" id="wd-media-recordings" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </td>
            <td>
              <input type="checkbox" id="wd-student-annotation" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
            <td>
              <input type="file" id="wd-file-upload" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <select id="wd-assign-to" defaultValue="All Students">
                <option value="All Students">All Students</option>
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
              </select>
            </td>
          </tr>

          {/* Dates */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input type="date" id="wd-available-from" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input type="date" id="wd-available-until" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
