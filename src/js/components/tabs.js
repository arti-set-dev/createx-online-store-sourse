import GraphTabs from 'graph-tabs';
import vars from '../_vars';

vars.tabElems?.forEach(tabEl => {
  const dataTab = tabEl.dataset.tabs;
  new GraphTabs(dataTab);
})
