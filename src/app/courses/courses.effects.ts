import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {CourseActions} from "./action-types";
import {CoursesHttpService} from "./services/courses-http.service";
import {concatMap, map} from "rxjs/operators";
import {allCoursesLoaded} from "./course.actions";


@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(
    () => this.action$.pipe(
      ofType(CourseActions.loadAllCourses),
        concatMap(action => this.coursesService.findAllCourses()),
          map(courses => allCoursesLoaded({courses}))
    )
  )

  saveCourses$ = createEffect(
    () => this.action$.pipe(
      ofType(CourseActions.courseUpdated),
      concatMap(action => this.coursesService.saveCourse(
        action.update.id,
        action.update.changes
      ))
    ), {dispatch:false}
  )
    constructor(private action$: Actions ,
                private coursesService: CoursesHttpService){

  }
}
