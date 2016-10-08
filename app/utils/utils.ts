export class Utils {
  public randomId() {
    return Math.random().toString(36).substring(7);
  }
}