class Tabs {
  constructor(settings){
    this.settings = settings;
    this._init(this.settings);
    this._events(this.settings);
  }
  _init(settings){
    $(`${settings.containerClassName} ${settings.tabClassName}:first`).addClass(settings.activeTabClassName);
    $(`${settings.containerClassName} ${settings.tabContentClassName}:first`).addClass("active_tab");
    $(`${settings.containerClassName} ${settings.tabContentClassName}`).not(":first").hide();
  }
  _events(settings){
    $(`${settings.containerClassName} ${settings.tabClassName}`).click(function() {
      $(`${settings.containerClassName} ${settings.tabClassName}`).removeClass(settings.activeTabClassName)
        .eq($(this).index()).addClass(settings.activeTabClassName);
      $(`${settings.containerClassName} ${settings.tabContentClassName}`).hide().eq($(this).index()).fadeIn();
    });
  }
}
function initTabs(settings){
  $(`${settings.containerClassName} ${settings.tabClassName}:first`).addClass(settings.activeTabClassName);
  $(`${settings.containerClassName} ${settings.tabContentClassName}:first`).addClass("active_tab");
  $(`${settings.containerClassName} ${settings.tabContentClassName}`).not(":first").hide();
  $(`${settings.containerClassName} ${settings.tabClassName}`).click(function() {
    $(`${settings.containerClassName} ${settings.tabClassName}`).removeClass(settings.activeTabClassName)
      .eq($(this).index()).addClass(settings.activeTabClassName);
    $(`${settings.containerClassName} ${settings.tabContentClassName}`).hide().eq($(this).index()).fadeIn();
  });
}