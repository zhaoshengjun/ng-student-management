declare let iqwerty: any;
export class ZTToast {
  defaultDuration = 2000;

  private static _sharedInstance: ZTToast;

  constructor() {
    if (!ZTToast._sharedInstance) {
      ZTToast._sharedInstance = this;
    }

    return ZTToast._sharedInstance;
  }

  warning(msg: string, duration: number = this.defaultDuration) {
    let options = {
      style: {
        main: {
          background: "#F89406",
          color: "white"
        }
      },
      settings: {
        duration
      }
    };
    iqwerty.toast.Toast(msg, options);
  }
  error(msg: string, duration: number = this.defaultDuration) {
    let options = {
      style: {
        main: {
          background: "#BD362F",
          color: "white"
        }
      },
      settings: {
        duration
      }
    };
    iqwerty.toast.Toast(msg, options);
  }
  info(msg: string, duration: number = this.defaultDuration) {
    let options = {
      style: {
        main: {
          background: "#333",
          color: "white"
        }
      },
      settings: {
        duration
      }
    };
    iqwerty.toast.Toast(msg, options);
  }
  success(msg: string, duration: number = this.defaultDuration) {
    let options = {
      style: {
        main: {
          background: "#51A351",
          color: "white"
        }
      },
      settings: {
        duration
      }
    };
    iqwerty.toast.Toast(msg, options);
  }
}