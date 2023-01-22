let Alerting = (alert, setAlert) => {
    setAlert(alert);
    setTimeout(()=>{
      return setAlert(null);
    }, 1000);
};

export default Alerting;