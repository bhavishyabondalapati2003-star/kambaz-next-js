"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, updateModule as updateModuleReducer, editModule } from "./reducer";
import * as client from "../../client";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const courseId = cid as string;

  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [moduleName, setModuleName] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
  if (!courseId) return;
  const newModule = { name: moduleName, course: courseId };
  const createdModule = await client.createModuleForCourse(courseId, newModule);
  dispatch(setModules([...modules, createdModule]));
  setModuleName("");
};

 const onRemoveModule = async (moduleId: string) => {
  await client.deleteModule(cid as string, moduleId);
  dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
};

const onUpdateModule = async (module: any) => {
  await client.updateModule(cid as string, module);
  const newModules = modules.map((m: any) =>
    m._id === module._id ? module : m
  );
  dispatch(setModules(newModules));
};

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div id="wd-modules">
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
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
                  value={module.name}
                  onChange={(e) =>
                    dispatch(updateModuleReducer({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}

              <div className="float-end">
                {isFaculty ? (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
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