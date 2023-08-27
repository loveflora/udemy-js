class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element,
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    const tooltipTemplate = document.getElementById("tooltip");
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector("p").textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = "absolute";
    tooltipElement.style.left = x + "px"; // 500px
    tooltipElement.style.top = y + "px";

    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);

    //) 드래그
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id,
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  //] 드래그
  // 드래깅 가능한 요소 구성하기
  connectDrag() {
    const item = document.getElementById(this.id);

    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });

    //) dragend
    // 드래그 끝나고 콘솔 출력
    item.addEventListener("dragend", (event) => {
      console.log(event);
      // dropEffect : "move"  ----> drag 성공
      // dropEffect : "none"  ----> drag 실패
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type",
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id),
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type),
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  // 드롭 구간 만들기
  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    //) dragenter
    list.addEventListener("dragenter", (event) => {
      // 드래그를 시작하면 데이터 유형을 정해줌
      // 추가적 확인 절차(데이터 유형 파악)
      if (event.dataTransfer.types[0] === "text/plain") {
        // 배경색 변경 css class 추가
        // list.parentElement : section
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });

    //) dragover
    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });

    //) dragleave
    // 요소가 리스트를 벗어나면 트리거됨
    list.addEventListener("dragleave", (event) => {
      // 연관된 대상에 대한 조상을 찾지 못한다면, list 밖에 있다는 것임.
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        // 핸들러 함수 내에서 this에 접근하고 있으므로, 화살표 함수를 사용하거나 bind() 해야 함
        list.parentElement.classList.remove("droppable");
      }
    });

    //) drop
    list.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");
      // id 비교
      if (this.projects.find((p) => p.id === prjId)) {
        // 찾았다면 이미 속해있던 리스트에 드롭한 것임
        return; // 바로 반환 --> 함수 실행 원하지 않음
      }

      // 드롭은 했지만, 실제론 activate 버튼 클릭 실행
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();

      // 배경색 제거
      list.parentElement.classList.remove("droppable");
      // event.preventDefault(); // not required
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList),
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList),
    );

    // const timerId = setTimeout(this.startAnalytics, 3000);

    // document.getElementById('stop-analytics-btn').addEventListener('click', () => {
    //   clearTimeout(timerId);
    // });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
