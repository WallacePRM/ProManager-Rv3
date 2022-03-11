export function calcTime(history: Array<History>) {

    let time = 0;

    for (let i = 0; i < history.length; i++) {

        if (history[i].action === 'play') {
            let d1 = new Date(history[i].date);
            let d2: Date;

            if (history[i + 1] !== undefined) {
                d2 = new Date(history[i + 1].date);
            }
            else {
                d2 = new Date();
            }
            time = time + ((d2.getTime() - d1.getTime()) / 1000);
        }
    }

    return time;
}

export function calcTimeProject(project: Project) {

    let projectTime = 0;

    for (let t = 0; t < project.tasks.length; t++) {

        projectTime = projectTime + calcTime(project.tasks[t].history || []);
    }

    return projectTime;
}

export function formatTime(time: number) {

    const hourTemp = time / 3600;
    const hour = Math.trunc(hourTemp);

    const minutesTemp = (hourTemp - hour) * 60;
    const minutes =  Math.trunc(minutesTemp);

    const seconds = Math.round((minutesTemp - minutes) * 60);

    const hStr = hour.toString().padStart(2, '0');
    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');

    return `${hStr}:${mStr}:${sStr}`;
}

type History = {
    action: string;
    date: string;
};

type Project = {
    tasks: Array<{
        history: Array<History>
    }>
}