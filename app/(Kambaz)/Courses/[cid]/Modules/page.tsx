"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const courseId = cid as string;

  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [moduleName, setModuleName] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  const filteredModules = modules.filter((m: any) => m.course === courseId);

  return (
    <div id="wd-modules">
      
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: courseId }));
            setModuleName("");
          }}
        />
      )}

      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {filteredModules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              
              {!module.editing && module.name}
              {module.editing && isFaculty && (
                <FormControl
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(updateModule({ ...module, editing: false }));
                    }
                  }}
                />
              )}

              
              <div className="float-end">
                
                {isFaculty ? (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(id) => dispatch(deleteModule(id))}
                    editModule={(id) => dispatch(editModule(id))}
                  />
                ) : (
                  
                  <LessonControlButtons />
                )}
              </div>
            </div>

           
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    
                    <div className="float-end">
                      <LessonControlButtons />
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
