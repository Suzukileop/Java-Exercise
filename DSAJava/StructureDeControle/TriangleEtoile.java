package DSAJava.StructureDeControle;

public class TriangleEtoile {
    public static void main(String[] args) {
        int longueur = 5;

        for (int i = 0; i < longueur; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}